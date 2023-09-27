import { type ValueOf } from '../../index.js';
import { BsaBadgesTypeEnum } from '../../index.js';

const getBadgeIcon = (type: ValueOf<typeof BsaBadgesTypeEnum>): string => {
    const values = {
        [BsaBadgesTypeEnum.BSA_SCORE]: 'headphones',
        [BsaBadgesTypeEnum.PERSONALITY]: 'account-multiple-outline',
        [BsaBadgesTypeEnum.SOFT_SKILLS]: 'account-star-outline',
    };
    return values[type];
};

export { getBadgeIcon };
