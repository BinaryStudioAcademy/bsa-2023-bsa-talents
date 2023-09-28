export {
    type TalentBadge,
    type TalentBadgeResponseDto,
    type ValueOf,
} from 'shared/build/index.js';

import { type BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type BSABadgeType } from '../enums/enums.js';

type MappedBSABadge = {
    id: string;
    score: number | null;
    maxScore: number | null;
    level: string | null;
    name: string;
    type: ValueOf<typeof BSABadgeType>;
    color: ValueOf<typeof BadgeColors>;
};

export { type MappedBSABadge };
