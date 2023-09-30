import { BsaBadgesTypeEnum } from 'shared/build/index.js';
import { type ValueOf } from 'shared/build/index.js';

import { BSABadgeType } from '../enums/bsa-badge.enum.js';

const values = {
    [BsaBadgesTypeEnum.ENGLISH_LEVEL]: BSABadgeType.SERVICE,
    [BsaBadgesTypeEnum.PROJECT_SCORE]: BSABadgeType.SERVICE,
    [BsaBadgesTypeEnum.LECTURE_SCORE]: BSABadgeType.SERVICE,
    [BsaBadgesTypeEnum.BEST_LECTURE_SCORE]: BSABadgeType.CUSTOM,
    [BsaBadgesTypeEnum.TEAM_SCORE]: BSABadgeType.CUSTOM,
    [BsaBadgesTypeEnum.COMMUNICATION_SCORE]: BSABadgeType.CUSTOM,
};

const getBadgeType = (
    type: ValueOf<typeof BsaBadgesTypeEnum>,
): ValueOf<typeof BSABadgeType> => {
    return values[type];
};

export { getBadgeType };
