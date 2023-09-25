import { type ValueOf } from '~/types/value-of.type.js';

import {
    type EnglishLevel,
    type NotConsidered,
    type PreferredLanguage,
} from '../../user-details/user-details.js';

type SkillsStepDto = {
    hardSkills: string[] | string;
    englishLevel: ValueOf<typeof EnglishLevel>;
    notConsidered: ValueOf<typeof NotConsidered>[];
    preferredLanguages: ValueOf<typeof PreferredLanguage>[];
    projectLinks: { url: string }[];
};

export { type SkillsStepDto };
