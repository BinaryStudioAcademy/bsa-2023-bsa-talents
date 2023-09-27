import { type SkillsStepDto } from '~/bundles/talent/types/types';

const SKILLS_AND_PROJECTS_DEFAULT_VALUES: SkillsStepDto = {
    hardSkills: [],
    englishLevel: '',
    notConsidered: [],
    preferredLanguages: [],
    projectLinks: [{ url: '' }],
};

const MAX_LINKS = 5;

export { MAX_LINKS, SKILLS_AND_PROJECTS_DEFAULT_VALUES };
