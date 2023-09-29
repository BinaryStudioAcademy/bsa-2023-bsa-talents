import { type LMSProject } from './lms-project.type.js';

type UserLMSDataDto = {
    userId: string;
    talent: string; // JSON
    averageProjectScore: number | null;
    averageLectureScore: number | null;
    lectureDetails: string; // JSON
    projectCoachesFeedback: string; // JSON
    hrFeedback: string; // JSON
    project: LMSProject;
};

export { type UserLMSDataDto };
