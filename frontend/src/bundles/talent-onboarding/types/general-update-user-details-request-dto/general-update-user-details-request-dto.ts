import {
    type TalentBadge,
    type UserDetailsUpdateRequestDto,
    type ValueOf,
} from 'shared/build/index.js';

import { type DataStatus } from '~/bundles/common/enums/enums.js';

type UserDetailsGeneralCustom = UserDetailsUpdateRequestDto & {
    hardSkills?: {
        value: string;
        label: string;
    }[];
    talentBadges?: TalentBadge[] | string[];
    badges?: string[];
    photo?: File | null;
    cv?: File | null;
    dataStatus?: ValueOf<typeof DataStatus>;
    createdAt?: string;
};

export { type UserDetailsGeneralCustom };
