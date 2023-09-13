import { type ValueOf } from '~/types/value-of.type';

import {
    type CountryList,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
} from '../user-details.js';

type UserDetailsSearchUsersRequestDto = {
    isBaseSearch?: boolean;
    searchValue: string;
    searchActiveCandidatesOnly: boolean;
    jobTitle?: ValueOf<typeof JobTitle>[];
    yearsOfExperience?: number[];
    hardSkills?: string[];
    BSABadges?: string[];
    location?: ValueOf<typeof CountryList>[];
    englishLevel?: ValueOf<typeof EnglishLevel>[];
    employmentType?: ValueOf<typeof EmploymentType>[];
    userBsaCharacteristics?: string[];
    userBsaProject?: string[];
};

export { type UserDetailsSearchUsersRequestDto };
