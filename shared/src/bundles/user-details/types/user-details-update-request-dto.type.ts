import { type ValueOf } from '~/types/value-of.type.js';

import { type OnboardingSteps } from '../user-details.js';
import { type UserDetailsUpdateDto } from './types.js';

type UserDetailsUpdateRequestDto = {
    id?: string;
    userId?: string;

    isApproved?: boolean;
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
    
    talentBadges?: string[];
    talentHardSkills?: string[];

    completedStep?: ValueOf<typeof OnboardingSteps>;
} & UserDetailsUpdateDto;

export { type UserDetailsUpdateRequestDto };
