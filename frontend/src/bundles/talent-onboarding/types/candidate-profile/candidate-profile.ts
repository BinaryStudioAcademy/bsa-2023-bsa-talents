import { type TalentBadge } from 'shared/build/index.js';

import { type HardSkillsItem, type Project } from '../types.js';

type FirstSectionDetails = {
    userId: string;
    profileName: string;
    salaryExpectation: string;
    projectLinks?: string[];
    location: string;
    experienceYears: number;
    englishLevel: string;
    badges?: TalentBadge[];
    talentHardSkills?: string[];
    hardSkills?: HardSkillsItem;
    preferredLanguages: string[];
    description: string;
    date: string;
    lmsProject?: Project;
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
