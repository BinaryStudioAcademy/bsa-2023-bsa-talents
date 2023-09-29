import {
    type HrFeedback,
    type LectureDetail,
    type Project,
    type ProjectCoachesFeedback,
    type Talent,
} from './types.js';

type UserLMSDataDto = {
    userId: string;
    talent: Talent;
    averageProjectScore: number | null;
    averageLectureScore: number | null;
    lectureDetails: LectureDetail[];
    projectCoachesFeedback: ProjectCoachesFeedback[];
    hrFeedback: HrFeedback;
    project: Project;
};

export { type UserLMSDataDto };
