import { type Entity } from '~/common/types/types.js';

import { type UserLMSDataDto } from './types/types.js';

class LMSDataEntity implements Entity {
    public userId: string;
    public english: string;
    public averageProjectScore: number | null;
    public averageLectureScore: number | null;
    public lectureDetails: string;
    public projectCoachesFeedback: string;
    public hrFeedback: string;
    public project: string;

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

    public toNewObject(): UserLMSDataDto {
        return this.toObject();
    }
}

export { LMSDataEntity };
