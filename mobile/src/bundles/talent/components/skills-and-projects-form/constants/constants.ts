import {
    EnglishLevel,
    NotConsidered,
    PreferredLanguages,
} from '~/bundles/common/enums/enums';
import { type SkillsStepDto } from '~/bundles/talent/types/types';

type Options = {
    label: string;
    value: string;
};
const SKILLS_AND_PROJECTS_DEFAULT_VALUES: SkillsStepDto = {
    hardSkills: [],
    englishLevel: '',
    notConsidered: [],
    preferredLanguages: [],
    projectLinks: [{ url: '' }],
};

// mock data, will get this from db
const HARD_SKILLS: Options[] = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'Ruby', label: 'Ruby' },
];

const ENGLISH_LEVEL = Object.values(EnglishLevel);
const PREFERRED_LANGUAGES_ARRAY = Object.values(PreferredLanguages);
const NOT_CONSIDERED = Object.values(NotConsidered);
const MAX_LINKS = 5;

export {
    ENGLISH_LEVEL,
    HARD_SKILLS,
    MAX_LINKS,
    NOT_CONSIDERED,
    PREFERRED_LANGUAGES_ARRAY,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
};
