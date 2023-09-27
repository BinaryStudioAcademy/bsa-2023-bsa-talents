import {
    type UserDetailsUpdateRequestDto,
    type ValueOf,
} from 'shared/build/index.js';

import { type DataStatus } from '~/bundles/common/enums/enums.js';

type UserDetailsGeneralCustom = UserDetailsUpdateRequestDto & {
    photo?: File | null;
    companyLogo?: File | null;
    dataStatus?: ValueOf<typeof DataStatus>;
    createdAt?: string;
    publishedAt?: string;
    cvUrl?: string | null;
    companyLogoUrl?: string | null;
    photoUrl?: string | null;
};

export { type UserDetailsGeneralCustom };
