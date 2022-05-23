import Repository from '../abstracts/repository';
import sqlite3 from 'sqlite3';
import ConcreteRepository from './concrete-repository';

export default class Updator 
{
    private repository : Repository;

    constructor( repository : Repository){
        this.repository = repository;
    };

    async updateStudentScoresForYearTermClass( scores : Object[], payload : Object | any ) : Promise<boolean> {
        const results : (number | undefined)[]= [];
        for (let i = 0; i < scores.length; i++){
            const score : Object | any = scores[i];
            const result = await (await this.getRepository().getClassDatabaseConnection(payload)).run(
                'UPDATE ' + payload.subject + ' SET Ca_Score = ?, Exam_Score = ? WHERE Student_No = ?', score.Ca_Score, score.Exam_Score, score.Student_No
            );
            results.push(result.changes);
        };
        for (let j = 0; j< results.length; j++){
            if (results[j] !== 1){ return false };
        }
        return true;
    };

    async updateStudentDetailsForYearTermClass( payload : Object | any ): Promise<boolean>{
        // update the student details in the all student details 
        const all = await (await this.getRepository().getAllStudentsDatabaseConnection( payload.data )).run(
            'UPDATE all_students SET Surname = ?, First_Name = ?, Middle_Name = ?, Department = ?, Gender = ?, D_O_B =?, State_of_Origin =?, Subject = ? WHERE Student_No = ?', payload.Surname, payload.First_Name, payload.Middle_Name, payload.Department, payload.Gender, payload.D_O_B, payload.State_of_Origin, payload.Subject, payload.Student_No
        );
        // update the student in the class database
        const clazz = await (await this.getRepository().getClassDatabaseConnection(payload.data)).run(
            'UPDATE ' + payload.data.clazz + ' SET Surname = ?, First_Name = ?, Middle_Name = ?, Department = ?, Gender = ?, D_O_B =?, State_of_Origin =?, Subject = ? WHERE Student_No = ?', payload.Surname, payload.First_Name, payload.Middle_Name, payload.Department, payload.Gender, payload.D_O_B, payload.State_of_Origin, payload.Subject, payload.Student_No
        );
        // update the student in the new subjects
        const subject = await this.registerStudentInNewSubjects( payload );

        if (all.changes === 1 && clazz.changes === 1 && subject === 1){ return true; };
        return false;
    };

    async registerStudentInNewSubjects( payload : Object | any ) : Promise<number> {
        const subjectString = payload.Subject;
        const studentNo = payload.Student_No;
        const result : number[] = [];

        const subjectArray = subjectString.split('#');
        
        for (let i = 0; i < subjectArray.length; i++){
            const subject = subjectArray[i];
            const student = await (await this.getRepository().getClassDatabaseConnection( payload.data )).get(
                'SELECT Student_No FROM ' + subject + ' WHERE Student_No = ?', studentNo
            );

            if ( student === undefined ){
                const done = (await (await this.getRepository().getClassDatabaseConnection(payload.data)).run(
                    "INSERT INTO " + subject + " (Student_No, Ca_Score, Exam_Score) VALUES (?, ?, ?)", studentNo, 0, 0
                )).changes;

                result.push( done as number );
            };
        };

        if( result.includes(0)){ return 0; };

        return 1;
    }

    async updateStudentPassportForYearTermClass( data : Object | any ): Promise<boolean> {
        const clazz = await (await this.getRepository().getClassDatabaseConnection(data)).run(
            'UPDATE ' + data.clazz + ' SET Passport_Image = ? WHERE Student_No = ?', data.Passport_Image, data.Student_No
        );
        
        if( clazz.changes === 1 ){ return true; };
        return false;
    };

    async updateSchoolData( payload : Object | any ) : Promise<number>{

        try{
            await this.getDefaultSchoolDataTable();
        } catch( error ){ };  // just do nothing and continue execution.

        const keys : string[]  = Object.keys( payload );

        for ( let i = 0; i < keys.length; i++ ){
            const key : string = keys[i].toString() as string;

            await ( await this.getRepository().getSchoolDataDatabaseConnection() ).run(
                'UPDATE school SET Data = ? WHERE Id = ? ', payload[key], key
            );
        }

        return 1;
    }

    private async getDefaultSchoolDataTable() {
        await ( await this.getRepository() as ConcreteRepository ).getCreator().createSchoolDataTable();
    }

    getRepository() : Repository {
        return this.repository;
    };
}