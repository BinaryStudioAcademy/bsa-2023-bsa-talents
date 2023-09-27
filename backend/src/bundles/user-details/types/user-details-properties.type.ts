import { type HardSkillsEntity } from '~/bundles/hard-skills/hard-skills.entity.js';
import { type TalentBadgeModel } from '~/bundles/talent-badges/talent-badge.model.js';
import { type ValueOf } from '~/common/types/types.js';

import {
    type Country,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type NotConsidered,
    type OnboardingStep,
    type PreferredLanguage,
    type SearchType,
} from '../enums/enums.js';
import { type UserDetailsResponseBadgeDto } from './types.js';

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
    location: ValueOf<typeof Country> | null;
    experienceYears: number | null;
    employmentType: ValueOf<typeof EmploymentType>[] | null;
    description: string | null;
    englishLevel: ValueOf<typeof EnglishLevel> | null;
    notConsidered: ValueOf<typeof NotConsidered>[] | null;
    preferredLanguages: ValueOf<typeof PreferredLanguage>[] | null;
    searchType: ValueOf<typeof SearchType>;
    projectLinks: string[] | null;
    hardSkills?: HardSkillsEntity[];
    badges?: UserDetailsResponseBadgeDto[] | TalentBadgeModel | null;
    photoId: string | null;
    fullName: string | null;
    phone: string | null;
    linkedinLink: string | null;
    companyName: string | null;
    companyLogoId: string | null;
    companyWebsite: string | null;
    employerPosition: string | null;
    cvId: string | null;
    completedStep: ValueOf<typeof OnboardingStep> | null;
    createdAt: string | null;
    email?: string | null;
    publishedAt: string | null;
};

export { type UserDetailsProperties };
