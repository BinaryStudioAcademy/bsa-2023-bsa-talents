import { type ValueOf } from '../../index.js';
import { BsaBadgesTypeEnum } from '../../index.js';

const getBadgeIcon = (type: ValueOf<typeof BsaBadgesTypeEnum>): string => {
    const values = {
        [BsaBadgesTypeEnum.ENGLISH_LEVEL]: 'headphones',
        [BsaBadgesTypeEnum.PROJECT_SCORE]: 'headphones',
        [BsaBadgesTypeEnum.LECTURE_SCORE]: 'headphones',
        [BsaBadgesTypeEnum.BEST_LECTURE_SCORE]: 'headphones',
        [BsaBadgesTypeEnum.TEAM_SCORE]: 'headphones',
        [BsaBadgesTypeEnum.COMMUNICATION_SCORE]: 'headphones',
    };
    return values[type];
};

export { getBadgeIcon };
