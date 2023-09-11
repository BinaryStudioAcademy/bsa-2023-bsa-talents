import { type ValueOf } from '~/types/value-of.type';

import {
    type CountryList,
    type CurrentStep,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type NotConsidered,
    type PreferredLanguages,
} from '../user-details.js';

type UserDetailsUpdateDto = {
    id: string;
    userId?: string;

    isHired?: boolean;

    profileName?: string;

    salaryExpectation?: number;
    hiredSalary?: number;

    jobTitle?: ValueOf<typeof JobTitle>;
    location?: ValueOf<typeof CountryList>;

    experienceYears?: number;
    employmentType?: ValueOf<typeof EmploymentType>[];

    description?: string;

    englishLevel?: ValueOf<typeof EnglishLevel>;
    notConsidered?: ValueOf<typeof NotConsidered>[];
    preferredLanguages?: ValueOf<typeof PreferredLanguages>[];

    projectLinks?: string[];
    photoId?: string;
    fullName?: string;
    phone?: string;
    linkedinLink?: string;
    companyName?: string;
    companyLogoId?: string;
    companyWebsite?: string;
    employerPosition?: string;
    cvId?: string;
    currentStep?: ValueOf<typeof CurrentStep>;
};

export { type UserDetailsUpdateDto };
