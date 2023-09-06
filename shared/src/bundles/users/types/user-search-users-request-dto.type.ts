import { type ValueOf } from '~/types/value-of.type';

import {
    type CountryList,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
} from '../../user-details/user-details.js';

type UserSearchUsersRequestDto = {
    search?: string;

    isHired?: boolean;
    jobTitle?: ValueOf<typeof JobTitle>;
    experienceYears?: number;
    hardSkills?: string[];
    BSABadges?: string[];
    location?: ValueOf<typeof CountryList>;
    englishLevel?: ValueOf<typeof EnglishLevel>;
    employmentType?: ValueOf<typeof EmploymentType>[];
    // TODO add BSA characteristics
    // TODO add BSA project name
};

export { type UserSearchUsersRequestDto };
