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
};

export { type bsaBadge };
