import { type TalentBadge } from 'shared/build/index.js';

import { type DataStatus } from '~/bundles/common/enums/enums.js';
import {
    type HardSkillsItem,
    type UserDetailsUpdateRequestDto,
    type ValueOf,
} from '~/bundles/search-candidates/types/types.js';

type SeacrhCandidateResponse = UserDetailsUpdateRequestDto & {
    hardSkills?: HardSkillsItem[];
    badges?: TalentBadge[];
    photo?: File | null;
    cv?: File | null;
    dataStatus?: ValueOf<typeof DataStatus>;
    createdAt?: string;
};

export { type SeacrhCandidateResponse };
