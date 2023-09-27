import { type DataStatus } from '~/bundles/common/enums/enums.js';
import {
    type HardSkillsItem,
    type UserDetailsUpdateRequestDto,
    type ValueOf,
} from '~/bundles/search-candidates/types/types.js';

type SeacrhCandidateDto = UserDetailsUpdateRequestDto & {
    hardSkills?: HardSkillsItem[];
    badges?: string[];
    photo?: File | null;
    cv?: File | null;
    dataStatus?: ValueOf<typeof DataStatus>;
    createdAt?: string;
};

export { type SeacrhCandidateDto };
