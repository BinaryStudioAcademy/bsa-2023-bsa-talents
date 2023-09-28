import { type ValueOf } from '../../index.js';
import { BsaBadgesTypeEnum } from '../../index.js';

const getBadgeColor = (type: ValueOf<typeof BsaBadgesTypeEnum>): string => {
    const values = {
        [BsaBadgesTypeEnum.BSA_SCORE]: '#18A0FB',
        [BsaBadgesTypeEnum.PERSONALITY]: '#FFD231',
        [BsaBadgesTypeEnum.SOFT_SKILLS]: '#21BA67',
    };
    return values[type];
};

export { getBadgeColor };
