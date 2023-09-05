import {
    EnglishLevel,
    JobTitle,
    NotConsidered,
    PreferredLanguages,
} from 'shared/build/index';

import { type UserSignUpStep3Dto } from '~/bundles/talent/types/types';

const SKILLS_AND_PROJECTS_DEFAULT_VALUES: UserSignUpStep3Dto = {
    hardSkills: '',
    englishLevel: '',
    notConsidered: [],
    preferredLanguages: [],
    projectLinks: [],
};

const ENGLISH_LEVEL = Object.values(EnglishLevel).map((language) => ({
    value: language,
    label: language,
}));

const PREFERRED_LANGUAGES_ARRAY = Object.values(PreferredLanguages).map(
    (language) => ({
        value: language,
        label: language,
    }),
);

const JOB_TITLES = Object.values(JobTitle).map((title) => ({
    label: title,
}));

const NOT_CONSIDERED = Object.values(NotConsidered).map((type) => ({
    value: type,
    label: type,
}));

export {
    ENGLISH_LEVEL,
    JOB_TITLES,
    NOT_CONSIDERED,
    PREFERRED_LANGUAGES_ARRAY,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
};
