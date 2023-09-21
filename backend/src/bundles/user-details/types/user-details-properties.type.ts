import { type FileModel } from '~/bundles/files/file.model.js';
import { type ValueOf } from '~/common/types/types.js';

import {
    type CountryList,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type NotConsidered,
    type OnboardingSteps,
    type PreferredLanguages,
} from '../enums/enums.js';

type UserDetailsProperties = {
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
    completedStep: ValueOf<typeof OnboardingSteps> | null;
    photo: ValueOf<typeof FileModel> | null;
    companyLogo: ValueOf<typeof FileModel> | null;
};

export { type UserDetailsProperties };
