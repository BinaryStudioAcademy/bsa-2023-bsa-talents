import { type mockBadges } from '~/assets/mock-data/mock-data.js';

import { type HardSkillsItem } from '../types.js';

type FirstSectionDetails = {
    userId: string;
    profileName: string;
    salaryExpectation: string;
    projectLinks?: string[];
    location: string;
    experienceYears: number;
    englishLevel: string;
    badges: typeof mockBadges;
    talentHardSkills?: string[];
    hardSkills?: HardSkillsItem;
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
    experienceYears: number;
    englishLevel: string;
    employmentType: string[];
    notConsidered: string[];
    cvId: string;
};

export { type FirstSectionDetails, type SecondSectionDetails };
