import {
    EnglishLevel,
    NotConsidered,
    PreferredLanguages,
} from '../../users/users.js';

const SkillsStepValidationRule = {
    ENGLISH_LEVEL: EnglishLevel,
    NOT_CONSIDERED: NotConsidered,
    PREFERRED_LANGUAGES: PreferredLanguages,
    HARD_SKILLS_MIN_LENGTH: 1,
    NOT_CONSIDERED_MIN_LENGTH: 1,
    PREFERRED_LANGUAGES_MIN_LENGTH: 1,
    PROJECT_LINKS_MAX_LINKS: 5,
    PROJECT_LINKS_MIN_LENGTH: 5,
    PROJECT_LINKS_MAX_LENGTH: 50,
};

export { SkillsStepValidationRule };
