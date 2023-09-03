import { JobTitle, PreferredLanguages } from 'shared/build/index';

const SKILLS_AND_PROJECTS_DEFAULT_VALUES = {
    hardSkills: '',
    levelOfEnglish: '',
    notConsider: {
        gambling: false,
        gameDev: false,
        dating: false,
        crypto: false,
        startups: false,
    },
    preferredLanguage: '',
    projectLinks: [],
};

const ENGLISH_LEVEL = [
    { label: 'No English', value: 'no english' },
    { label: 'A1 Elementary', value: 'elementary' },
    { label: 'A2 Pre-intermediate', value: 'pre-intermediate' },
    { label: 'B1 Intermediate', value: 'intermediate' },
    { label: 'B2 Upper intermediate', value: 'upper-intermediate' },
    { label: 'C1 Advanced', value: 'advanced' },
    { label: 'C2 Proficiency', value: 'proficiency' },
];

const PREFERRED_LANGUAGES_ARRAY = (
    Object.keys(PreferredLanguages) as (keyof typeof PreferredLanguages)[]
).map((key) => ({
    label: PreferredLanguages[key],
    value: key.toLowerCase(),
}));

const JOB_TITLES = (Object.keys(JobTitle) as (keyof typeof JobTitle)[]).map(
    (key) => ({
        label: JobTitle[key],
        value: key.toLowerCase(),
    }),
);

export {
    ENGLISH_LEVEL,
    JOB_TITLES,
    PREFERRED_LANGUAGES_ARRAY,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
};
