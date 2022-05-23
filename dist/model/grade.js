"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grade_error_1 = require("../config/grade-error");
/**
 *  Returns the grade associated to a Subject object.
 */
class Grade {
    /**
     * @param totalScore number
     * @returns grade : string
     */
    static getGradeFromTotal(totalScore) {
        var grade = '';
        switch (true) {
            case (totalScore >= 80 && totalScore <= 100):
                grade = 'A';
                break;
            case (totalScore >= 70 && totalScore <= 79):
                grade = 'B';
                break;
            case (totalScore >= 60 && totalScore <= 69):
                grade = 'C';
                break;
            case (totalScore >= 50 && totalScore <= 59):
                grade = 'D';
                break;
            case (totalScore >= 40 && totalScore <= 49):
                grade = 'E';
                break;
            case (totalScore >= 0 && totalScore <= 39):
                grade = 'F';
                break;
            case (totalScore < 0): throw grade_error_1.NegativeScoreError;
            default: throw grade_error_1.OverflowScorError;
        }
        ;
        return grade;
    }
    ;
    static getRemarks(grade) {
        var remark = '';
        switch (grade) {
            case 'A':
                remark = 'Excellent';
                break;
            case 'B':
                remark = 'Very Good';
                break;
            case 'C':
                remark = 'Good';
                break;
            case 'D':
                remark = 'Fair';
                break;
            case 'E':
                remark = 'Poor';
                break;
            case 'F':
                remark = 'Failed';
                break;
        }
        ;
        return remark;
    }
    ;
}
exports.default = Grade;
;
