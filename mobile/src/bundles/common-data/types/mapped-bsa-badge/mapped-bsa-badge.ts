import {
    type BadgeColors,
    type BSABadgeType,
} from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types.js';

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
