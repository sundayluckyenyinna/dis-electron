import Grade from './grade';

/**
 *  Defines the properties and behaviour of a Subject object.
 */
export default class Subject
{
    /** The Subject name associted to this Subject object. */
    private name : string = '';

    /**  Returns the CaScore asocited to this Subject object. */
    private caScore : number = 0;

    /** Returns the ExamScore associated to this Subject object. */
    private examScore : number = 0;

    private level : string = '';

    /** */
    constructor(){

    };

    /**
     * Returns the subject name associated with this Subject object.
     * @returns subjectName : string
     */
    getName() : string {
        return this.name;
    };

    /**
     * Returns the CaScore associated to this Subject object.
     * @returns caScore : number
     */
    getCaScore() : number {
        return this.caScore;
    };

    /**
     * Returns the examScore associated to this Subject object.
     * @returns ExamScore : number
     */
    getExamScore() : number {
        return this.examScore;
    };

    /**
     * Returns the TotalScore associated to this Subject object.
     * @returns totalScore : number
     */
    getTotalScore() : number {
        return this.getCaScore() + this.getExamScore();
    };

    /**
     * Returns the Grade associated to this Subject object.
     * @returns grade : string
     */
    getGrade() : string {
        return Grade.getGradeFromTotal( this.getTotalScore() );
    };

    getLevel() : string {
        return this.level;
    };

    getRemarks() : string {
        return Grade.getRemarks( this.getGrade() );
    };

    setName( name : string ) : Subject {
        this.name = name;
        return this;
    };

    setCaScore( caScore : number ) : Subject {
        this.caScore = caScore;
        return this;
    };

    setExamScore ( examScore : number ) : Subject {
        this.examScore = examScore;
        return this;
    };

    setLevel ( level : string ) : Subject {
        this.level = level;
        return this;
    };

};