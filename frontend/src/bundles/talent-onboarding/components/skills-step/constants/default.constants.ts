import { type SkillsStepDto } from './../types/types.js';

const DEFAULT_PAYLOAD_SKILLS_STEP: SkillsStepDto = {
    hardSkills: [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'HTML', label: 'HTML' },
    ],
    englishLevel: '',
    notConsidered: [],
    preferredLanguages: [],
    projectLinks: [{ url: '' }],
};

export { DEFAULT_PAYLOAD_SKILLS_STEP };
