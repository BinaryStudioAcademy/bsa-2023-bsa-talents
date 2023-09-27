import { type SkillsStepDto } from '~/bundles/talent/types/types';

const SKILLS_AND_PROJECTS_DEFAULT_VALUES: SkillsStepDto = {
    hardSkills: [],
    englishLevel: '',
    notConsidered: [],
    preferredLanguages: [],
    projectLinks: [{ url: '' }],
};

export { SKILLS_AND_PROJECTS_DEFAULT_VALUES };
