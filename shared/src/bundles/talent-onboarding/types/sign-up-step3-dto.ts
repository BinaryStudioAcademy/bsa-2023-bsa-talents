import {
    type EnglishLevel,
    type NotConsidered,
    type PreferredLanguages,
} from '~/bundles/users/users';
import { type ValueOf } from '~/types/value-of.type';

type UserSignUpStep3Dto = {
    hardSkills: string[] | string;
    englishLevel: ValueOf<typeof EnglishLevel>;
    notConsidered: ValueOf<typeof NotConsidered>[];
    preferredLanguages: ValueOf<typeof PreferredLanguages>[];
    projectLinks: { url: string }[];
};

export { type UserSignUpStep3Dto };
