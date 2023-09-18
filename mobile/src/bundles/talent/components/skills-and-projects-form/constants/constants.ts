import {
    EnglishLevel,
    NotConsidered,
    PreferredLanguages,
} from 'shared/build/index';

import { type SkillsStepDto } from '~/bundles/talent/types/types';

const SKILLS_AND_PROJECTS_DEFAULT_VALUES: SkillsStepDto = {
    hardSkills: [],
    englishLevel: '',
    notConsidered: [],
    preferredLanguages: [],
    projectLinks: [{ url: '' }],
};

const ENGLISH_LEVEL = Object.values(EnglishLevel);
const PREFERRED_LANGUAGES_ARRAY = Object.values(PreferredLanguages);
const NOT_CONSIDERED = Object.values(NotConsidered);
const MAX_LINKS = 5;

export {
    ENGLISH_LEVEL,
    MAX_LINKS,
    NOT_CONSIDERED,
    PREFERRED_LANGUAGES_ARRAY,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
};
