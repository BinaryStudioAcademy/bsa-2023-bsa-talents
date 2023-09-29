import {
    type LMSDataResponseDto,
    type LMSDataServerResponseDto,
} from '~/index.js';

function parseLMSServerData(
    userId: string,
    serverData: LMSDataServerResponseDto,
): LMSDataResponseDto {
    return {
        talent: {
            ...serverData.talent,
            id: userId,
        },
        averageProjectScore: serverData.averageProjectScore,
        averageLectureScore: serverData.averageLectureScore,
        lectureDetails: serverData.lectureDetails,
        projectCoachesFeedback: serverData.projectCoachesFeedback,
        hrFeedback: serverData.hrFeedback,
        project: serverData.project,
    };
}

export { parseLMSServerData };
