import { type ValueOf } from '../../index.js';
import { BsaBadgesTypeEnum } from '../../index.js';

const getBadgeColor = (type: ValueOf<typeof BsaBadgesTypeEnum>): string => {
    const values = {
        [BsaBadgesTypeEnum.ENGLISH_LEVEL]: '#21BA67',
        [BsaBadgesTypeEnum.PROJECT_SCORE]: '#274F8D;',
        [BsaBadgesTypeEnum.LECTURE_SCORE]: '#EE2A64',
        [BsaBadgesTypeEnum.BEST_LECTURE_SCORE]: '#FF9519',
        [BsaBadgesTypeEnum.TEAM_SCORE]: '#D32AEE',
        [BsaBadgesTypeEnum.COMMUNICATION_SCORE]: '#FFD231',
    };
    return values[type];
};

export { getBadgeColor };
