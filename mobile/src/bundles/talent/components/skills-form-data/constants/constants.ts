import {
    EnglishLevel,
    NotConsidered,
    PreferredLanguage,
} from '~/bundles/common/enums/enums';

const ENGLISH_LEVELS = Object.values(EnglishLevel);
const PREFERRED_LANGUAGES = Object.values(PreferredLanguage);
const NOT_CONSIDERED = Object.values(NotConsidered);
const MAX_LINKS = 5;

export { ENGLISH_LEVELS, MAX_LINKS, NOT_CONSIDERED, PREFERRED_LANGUAGES };
