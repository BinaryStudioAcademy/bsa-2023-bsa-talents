import { type mockBadges } from '~/assets/mock-data/mock-data.js';

type FirstSectionDetails = {
    profileName: string;
    salaryExpectation: string;
    projectLinks?: string[];
    location: string;
    experienceYears: string;
    englishLevel: string;
    badges: typeof mockBadges;
    hardSkills?: string[];
    preferredLanguages: string[];
    description: string;
    date: string;
};

type SecondSectionDetails = {
    jobTitle: string;
    projectLinks: string[];
    photoId?: string;
    fullName: string;
    salaryExpectation: string;
    email?: string;
    phone: string;
    location: string;
    experienceYears: string;
    englishLevel: string;
    employmentType: string[];
    notConsidered: string[];
    cvId: string;
};

export { type FirstSectionDetails, type SecondSectionDetails };
