import {
    type CountryList,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type NotConsidered,
    type PreferredLanguages,
} from '~/bundles/users/types/types.js';

type UserDetailsProperties = {
    id: string | null;
    userId: string;
    isApproved: boolean;
    deniedReason: string | null;
    isHired: boolean;
    profileName: string | null;
    salaryExpectation: number | null;
    hiredSalary: number | null;
    jobTitle: JobTitle | null;
    location: CountryList | null;
    experienceYears: number | null;
    employmentType: EmploymentType[] | null;
    description: string | null;
    englishLevel: EnglishLevel | null;
    notConsidered: NotConsidered[] | null;
    preferredLanguages: PreferredLanguages[] | null;
    projectLinks: string[] | null;
    photoId: string | null;
    fullName: string;
    phone: string | null;
    linkedinLink: string | null;
    companyName: string | null;
    companyLogoId: string | null;
    companyWebsite: string | null;
    employerPosition: string | null;
    cvId: string | null;
};

export { type UserDetailsProperties };
