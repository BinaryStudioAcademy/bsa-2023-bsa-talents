import { type BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type BSABadgeType } from '../enums/enums.js';

type BSABadge = {
    id: string;
    score?: number;
    maxScore?: number;
    level?: string;
    description: string;
    type: ValueOf<typeof BSABadgeType>;
    color: ValueOf<typeof BadgeColors>;
};

export { type BSABadge };
