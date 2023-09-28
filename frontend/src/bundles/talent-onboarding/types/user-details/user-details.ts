import { type TalentBadge } from 'shared/build/index.js';

import { type DataStatus } from '~/bundles/common/enums/enums.js';
import {
    type UserDetailsUpdateRequestDto,
    type ValueOf,
} from '~/bundles/search-candidates/types/types.js';

type UserDetails = UserDetailsUpdateRequestDto & {
    hardSkills?: {
        value: string;
        label: string;
    }[];
    badges?: string[] | null;
    talentBadges?: TalentBadge[];
    photo?: File | null;
    cv?: File | null;
    companyLogo?: File | null;
    dataStatus?: ValueOf<typeof DataStatus>;
    createdAt?: string;
    publishedAt?: string;
    cvUrl?: string | null;
    companyLogoUrl?: string | null;
    photoUrl?: string | null;
};

export { type UserDetails };
