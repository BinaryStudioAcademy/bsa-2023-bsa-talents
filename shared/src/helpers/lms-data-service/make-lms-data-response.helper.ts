import {
    type HrFeedback,
    type LectureDetail,
    type LMSDataResponseDto,
    type Project,
    type ProjectCoachesFeedback,
    type Talent,
    type UserLMSDataDto,
} from '~/index.js';

function makeLMSDataResponse(
    userLMSDataDto: UserLMSDataDto,
): LMSDataResponseDto {
    return {
        talent: userLMSDataDto.talent as unknown as Talent,
        averageProjectScore: userLMSDataDto.averageProjectScore,
        averageLectureScore: userLMSDataDto.averageLectureScore,
        lectureDetails:
            userLMSDataDto.lectureDetails as unknown as LectureDetail[],
        projectCoachesFeedback:
            userLMSDataDto.projectCoachesFeedback as unknown as ProjectCoachesFeedback[],
        hrFeedback: userLMSDataDto.hrFeedback as unknown as HrFeedback,
        project: userLMSDataDto.project as unknown as Project,
    };
}

export { makeLMSDataResponse };
