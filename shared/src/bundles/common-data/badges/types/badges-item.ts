import { type BsaBadgesTypeEnum } from '~/bundles/common-data/badges/badges.js';
import { type BsaBadgesTitle } from '~/bundles/common-data/common-data.js';
import { type ValueOf } from '~/types/value-of.type.js';

type BadgesItem = {
    id: string;
    type: ValueOf<typeof BsaBadgesTypeEnum>;
    name: ValueOf<typeof BsaBadgesTitle>;
    maxScore: string | number | null;
};

export { type BadgesItem };
