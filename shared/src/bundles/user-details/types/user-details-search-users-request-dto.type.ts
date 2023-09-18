import { type ValueOf } from '~/types/value-of.type.js';

import { type UserSortCriteria } from '../enums/users-sort-criteria.enum.js';
import {
    type CountryList,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type YearsOfExperience,
} from '../user-details.js';

type UserDetailsSearchUsersRequestDto = {
    sortBy?: (typeof UserSortCriteria)[keyof typeof UserSortCriteria]['label'];
    isBaseSearch?: boolean;
    searchValue: string;
    searchActiveCandidatesOnly: boolean;
    jobTitle?: ValueOf<typeof JobTitle>[];
    yearsOfExperience?: ValueOf<typeof YearsOfExperience>[];
    hardSkills?: string[];
    BSABadges?: string[];
    location?: ValueOf<typeof CountryList>[];
    englishLevel?: ValueOf<typeof EnglishLevel>[];
    employmentType?: ValueOf<typeof EmploymentType>[];
    userBsaCharacteristics?: string[];
    userBsaProject?: string[];
};

export { type UserDetailsSearchUsersRequestDto };