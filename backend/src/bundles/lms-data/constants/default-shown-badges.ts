import { BsaBadgesTypeEnum } from '../enums/enums.js';

const defaultShownBadges = {
    [BsaBadgesTypeEnum.ENGLISH_LEVEL]: true,
    [BsaBadgesTypeEnum.LECTURE_SCORE]: true,
    [BsaBadgesTypeEnum.BEST_LECTURE_SCORE]: false,
    [BsaBadgesTypeEnum.PROJECT_SCORE]: true,
    [BsaBadgesTypeEnum.COMMUNICATION_SCORE]: false,
    [BsaBadgesTypeEnum.TEAM_SCORE]: false,
} as const;

export { defaultShownBadges };
