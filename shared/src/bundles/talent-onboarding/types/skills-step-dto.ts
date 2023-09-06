import { type ValueOf } from '~/types/value-of.type';

import {
    type EnglishLevel,
    type NotConsidered,
    type PreferredLanguages,
} from '../../user-details/user-details.js';

type SkillsStepDto = {
    hardSkills: string[] | string;
    englishLevel: ValueOf<typeof EnglishLevel>;
    notConsidered: ValueOf<typeof NotConsidered>[];
    preferredLanguages: ValueOf<typeof PreferredLanguages>[];
    projectLinks: { url: string }[];
};

export { type SkillsStepDto };
