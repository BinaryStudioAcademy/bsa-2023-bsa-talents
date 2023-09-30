import { BsaBadgesTypeEnum } from '../enums/enums.js';

const badgeTypeToLMSProperty = {
    [BsaBadgesTypeEnum.ENGLISH_LEVEL]: 'english',
    [BsaBadgesTypeEnum.LECTURE_SCORE]: 'averageLectureScore',
    [BsaBadgesTypeEnum.BEST_LECTURE_SCORE]: 'grade',
    [BsaBadgesTypeEnum.PROJECT_SCORE]: 'averageProjectScore',
    [BsaBadgesTypeEnum.COMMUNICATION_SCORE]: 'communication_result',
    [BsaBadgesTypeEnum.TEAM_SCORE]: 'team_interaction',
};

export { badgeTypeToLMSProperty };
