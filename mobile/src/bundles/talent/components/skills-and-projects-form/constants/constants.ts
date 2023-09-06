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
    projectLinks: [{ url: '' }],
};

const ENGLISH_LEVEL = Object.values(EnglishLevel);
const PREFERRED_LANGUAGES_ARRAY = Object.values(PreferredLanguages);
// TODO: Change job title to hard skills enum
const JOB_TITLES = Object.values(JobTitle);
const NOT_CONSIDERED = Object.values(NotConsidered);

export {
    ENGLISH_LEVEL,
    JOB_TITLES,
    NOT_CONSIDERED,
    PREFERRED_LANGUAGES_ARRAY,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
};
