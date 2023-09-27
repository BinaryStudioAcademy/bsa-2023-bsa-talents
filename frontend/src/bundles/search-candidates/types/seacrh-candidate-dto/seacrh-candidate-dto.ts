import {
    type UserDetailsUpdateRequestDto,
    type ValueOf,
} from 'shared/build/index.js';

import { type DataStatus } from '~/bundles/common/enums/enums.js';

type SeacrhCandidateDto = UserDetailsUpdateRequestDto & {
    hardSkills?: {
        id: string;
        name: string;
    }[];
    badges?: string[];
    photo?: File | null;
    cv?: File | null;
    dataStatus?: ValueOf<typeof DataStatus>;
    createdAt?: string;
};

export { type SeacrhCandidateDto };
