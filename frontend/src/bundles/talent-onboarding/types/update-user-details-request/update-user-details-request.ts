import {
    type UserDetailsUpdateRequestDto,
    type ValueOf,
} from 'shared/build/index.js';

import { type DataStatus } from '~/bundles/common/enums/enums.js';

type UserDetailsGeneralCustom = UserDetailsUpdateRequestDto & {
    hardSkills?: {
        value: string;
        label: string;
    }[];
    badges?: string[];
    photo?: File | null;
    photoUrl?: string | null;
    cv?: File | null;
    cvUrl?: string | null;
    cvName?: string;
    dataStatus?: ValueOf<typeof DataStatus>;
    createdAt?: string;
    publishedAt?: string;
};

export { type UserDetailsGeneralCustom };
