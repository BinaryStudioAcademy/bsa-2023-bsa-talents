import { type Entity } from '~/common/types/types.js';

import {
    type HrFeedback,
    type LectureDetail,
    type Project,
    type ProjectCoachesFeedback,
    type UserLMSDataDto,
} from './types/types.js';

class LMSDataEntity implements Entity {
    private userId: string;
    private english: string;
    private averageProjectScore: number;
    private averageLectureScore: number;
    private lectureDetails: LectureDetail[];
    private projectCoachesFeedback: ProjectCoachesFeedback[];
    private hrFeedback: HrFeedback;
    private project: Project;

    private constructor(userLMSDataDto: UserLMSDataDto) {
        this.userId = userLMSDataDto.userId;
        this.english = userLMSDataDto.english;
        this.averageProjectScore = userLMSDataDto.averageProjectScore;
        this.averageLectureScore = userLMSDataDto.averageLectureScore;
        this.lectureDetails = userLMSDataDto.lectureDetails;
        this.projectCoachesFeedback = userLMSDataDto.projectCoachesFeedback;
        this.hrFeedback = userLMSDataDto.hrFeedback;
        this.project = userLMSDataDto.project;
    }

    public static initialize(userLMSDataDto: UserLMSDataDto): LMSDataEntity {
        return new LMSDataEntity({
            userId: userLMSDataDto.userId,
            english: userLMSDataDto.english,
            averageProjectScore: userLMSDataDto.averageProjectScore,
            averageLectureScore: userLMSDataDto.averageLectureScore,
            lectureDetails: userLMSDataDto.lectureDetails,
            projectCoachesFeedback: userLMSDataDto.projectCoachesFeedback,
            hrFeedback: userLMSDataDto.hrFeedback,
            project: userLMSDataDto.project,
        });
    }

    public toObject(): UserLMSDataDto {
        return {
            userId: this.userId,
            english: this.english,
            averageProjectScore: this.averageProjectScore,
            averageLectureScore: this.averageLectureScore,
            lectureDetails: this.lectureDetails,
            projectCoachesFeedback: this.projectCoachesFeedback,
            hrFeedback: this.hrFeedback,
            project: this.project,
        };
    }

    // may this cause some problem?
    public toNewObject(): UserLMSDataDto {
        return this.toObject();
    }
}

export { LMSDataEntity };
