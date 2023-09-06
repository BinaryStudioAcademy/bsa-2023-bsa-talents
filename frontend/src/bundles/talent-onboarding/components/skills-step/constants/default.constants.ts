import { type SkillsStepFormValues } from '../types/skills-step-form-values.js';

const DEFAULT_PAYLOAD_SKILLS_STEP: SkillsStepFormValues = {
    hardSkills: [],
    englishLevel: ' ',
    notConsidered: [],
    preferredLanguages: [], // here
    projectLinks: [{ url: '' }],
};

export { DEFAULT_PAYLOAD_SKILLS_STEP };
