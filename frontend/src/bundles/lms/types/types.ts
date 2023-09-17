import { type BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

const bsaBadgeType = {
    CUSTOM: 'custom',
    SERVICE: 'service',
};

type bsaBadge = {
    id: string;
    score?: number;
    maxScore?: number;
    level?: string;
    description: string;
    type: ValueOf<typeof bsaBadgeType>;
    color: ValueOf<typeof BadgeColors>;
};

export { type bsaBadge };
