import { type ValueOf } from '~/types/value-of.type.js';

import { type UserSortCriteria } from '../enums/users-sort-criteria.enum.js';
import {
    type Country,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type SearchType,
    type YearsOfExperience,
} from '../user-details.js';

type UserDetailsSearchUsersRequestDto = {
    sortBy:
        | (typeof UserSortCriteria)[keyof typeof UserSortCriteria]['value']
        | '';
    searchStringType?: string;
    searchValue?: string;
    searchType?: ValueOf<typeof SearchType>;
    jobTitle?: ValueOf<typeof JobTitle>[];
    yearsOfExperience?: ValueOf<typeof YearsOfExperience>[];
    hardSkills?: string[];
    location?: ValueOf<typeof Country>[];
    englishLevel?: ValueOf<typeof EnglishLevel>[];
    employmentType?: ValueOf<typeof EmploymentType>[];
    userBsaCharacteristics?: string[];
    userBsaProject?: string[];
};

export { type UserDetailsSearchUsersRequestDto };
