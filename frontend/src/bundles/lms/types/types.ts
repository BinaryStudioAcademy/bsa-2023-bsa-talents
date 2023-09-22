import { type BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';
import { type BsaBadgeType } from '~/bundles/common/enums/badge-types.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type bsaBadge = {
    id: string;
    score?: number;
    maxScore?: number;
    level?: string;
    description: string;
    type: ValueOf<typeof BsaBadgeType>;
    color: ValueOf<typeof BadgeColors>;
};

export { type bsaBadge };
