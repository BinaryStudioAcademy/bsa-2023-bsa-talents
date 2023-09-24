import {
    EnglishLevel,
    NotConsidered,
    PreferredLanguages,
} from '~/bundles/common/enums/enums';
import { type SkillsStepDto } from '~/bundles/talent/types/types';

const SKILLS_AND_PROJECTS_DEFAULT_VALUES: SkillsStepDto = {
    hardSkills: [],
    englishLevel: '',
    notConsidered: [],
    preferredLanguages: [],
    projectLinks: [{ url: '' }],
};

const ENGLISH_LEVELS = Object.values(EnglishLevel);
const PREFERRED_LANGUAGES = Object.values(PreferredLanguages);
const NOT_CONSIDERED = Object.values(NotConsidered);
const MAX_LINKS = 5;

export {
    ENGLISH_LEVELS,
    MAX_LINKS,
    NOT_CONSIDERED,
    PREFERRED_LANGUAGES,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
};
