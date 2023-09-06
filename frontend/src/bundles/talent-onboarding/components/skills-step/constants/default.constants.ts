import { type SkillsStepDto } from '../../../../../../../shared/src/bundles/talent-onboarding/types/skills-step/skills-step-dto.js';

const DEFAULT_PAYLOAD_SKILLS_STEP: SkillsStepDto = {
    hardSkills: [],
    englishLevel: ' ',
    notConsidered: [],
    preferredLanguages: [], // here
    projectLinks: [{ url: '' }],
};

export { DEFAULT_PAYLOAD_SKILLS_STEP };
