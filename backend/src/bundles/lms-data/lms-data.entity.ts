import { type Entity } from '~/common/types/types.js';

import { type UserLMSDataDto } from './types/types.js';

class LMSDataEntity implements Entity {
    public talent: string; // JSON
    public averageProjectScore: number | null;
    public averageLectureScore: number | null;
    public lectureDetails: string; // JSON
    public projectCoachesFeedback: string; // JSON
    public hrFeedback: string; // JSON
    public project: string; // JSON

    private constructor(userLMSDataDto: UserLMSDataDto) {
        this.talent = userLMSDataDto.talent;
        this.averageProjectScore = userLMSDataDto.averageProjectScore;
        this.averageLectureScore = userLMSDataDto.averageLectureScore;
        this.lectureDetails = userLMSDataDto.lectureDetails;
        this.projectCoachesFeedback = userLMSDataDto.projectCoachesFeedback;
        this.hrFeedback = userLMSDataDto.hrFeedback;
        this.project = userLMSDataDto.project;
    }

    public static initialize(userLMSDataDto: UserLMSDataDto): LMSDataEntity {
        return new LMSDataEntity({
            talent: userLMSDataDto.talent,
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
            talent: this.talent,
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
