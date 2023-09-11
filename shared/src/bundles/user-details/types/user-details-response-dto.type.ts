import { type ValueOf } from '~/types/value-of.type';

import {
    type CountryList,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type NotConsidered,
    type PreferredLanguages,
} from '../user-details.js';

type UserDetailsResponseDto = {
    id: string | null;
    userId: string;
    isApproved: boolean;
    deniedReason: string | null;
    isHired: boolean;
    profileName: string | null;
    salaryExpectation: number | null;
    hiredSalary: number | null;
    jobTitle: ValueOf<typeof JobTitle> | null;
    location: ValueOf<typeof CountryList> | null;
    experienceYears: number | null;
    employmentType: ValueOf<typeof EmploymentType>[] | null;
    description: string | null;
    englishLevel: ValueOf<typeof EnglishLevel> | null;
    notConsidered: ValueOf<typeof NotConsidered>[] | null;
    preferredLanguages: ValueOf<typeof PreferredLanguages>[] | null;
    projectLinks: string[] | null;
    photoId: string | null;
    fullName: string | null;
    phone: string | null;
    linkedinLink: string | null;
    companyName: string | null;
    companyLogoId: string | null;
    companyWebsite: string | null;
    employerPosition: string | null;
    cvId: string | null;
};

export { type UserDetailsResponseDto };
