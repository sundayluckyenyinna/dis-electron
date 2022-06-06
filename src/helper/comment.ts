/**
 * This class is the base class for the TeacherComment and the PrincipalComment
 */

import { DEFAULT_BAD_BEHAVIOUR_TEACHER_COMMENTS, DEFAULT_EXCELLENT_PRINCIPAL_COMMENTS, DEFAULT_FAILED_PRINCIPAL_COMMENT, DEFAULT_GOOD_BEHAVIOUR_TEACHER_COMMENTS, DEFAULT_GOOD_PRINCIPAL_COMMENT, DEFAULT_POOR_PRINCIPAL_COMMENT, DEFAULT_VERY_GOOD_PRINCIPAL_COMMENTS } from "./default-comment";

export default abstract class Comment
{

    private filePath : string;

    private static teacherGoodBehaviourComments : string[] = DEFAULT_GOOD_BEHAVIOUR_TEACHER_COMMENTS;
    private static teacherBadBehaviourComments : string[] = DEFAULT_BAD_BEHAVIOUR_TEACHER_COMMENTS;

    private static principalExcellentScoreComment : string[] = DEFAULT_EXCELLENT_PRINCIPAL_COMMENTS;
    private static principalVeryGoodScoreComment : string[] = DEFAULT_VERY_GOOD_PRINCIPAL_COMMENTS;
    private static principalGoodScoreComment : string[]  = DEFAULT_GOOD_PRINCIPAL_COMMENT;
    private static principalPoorScoreComment : string[] = DEFAULT_POOR_PRINCIPAL_COMMENT;
    private static principalFailedScoreComment : string[] = DEFAULT_FAILED_PRINCIPAL_COMMENT;


    constructor( filePath : string ){
        this.filePath = filePath;
    };

    /**
     * The base function to read all the comments of a particular kind from a comment file.
     * The comment file can either be a '.txt', '.doc' or a '.pdf' file.
     */

    abstract loadComments() : Promise<String[]>;

    /**
     * Returns a random comment from the 
     */

}