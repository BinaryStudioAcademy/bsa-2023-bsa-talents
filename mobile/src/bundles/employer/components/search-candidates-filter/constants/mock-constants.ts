const YEARS_EXPERIENCE = [
    { label: '< 1', value: '<1' },
    { label: 'from 1 to 2', value: '>1 && <2' },
    { label: '2+', value: '2+' },
];

const BSA_CHARACTERISTICS = [
    { label: 'bad', value: 'bad' },
    { label: 'good', value: 'good' },
    { label: 'great', value: 'great' },
];

const BSA_BADGES = [
    {
        label: 'Project average score',
        value: 'pas',
    },
    {
        label: 'Lecture average score',
        value: 'las',
    },
    {
        label: 'Communication score',
        value: 'cs',
    },
    {
        label: 'Working with team score',
        value: 'ts',
    },
    {
        label: 'Level of english',
        value: 'el',
    },
    {
        label: 'Punctuality',
        value: 'punctuality',
    },
];

const BSA_PROJECT = [
    { label: 'Talents', value: 'talents' },
    { label: 'Writorium', value: 'writorium' },
    { label: 'TowHub', value: 'towHub' },
    { label: 'CalmPal', value: 'calmPal' },
    { label: 'EasyMeets', value: 'easyMeets' },
    { label: 'LeetWars', value: 'leetWars' },
];

export { BSA_BADGES, BSA_CHARACTERISTICS, BSA_PROJECT, YEARS_EXPERIENCE };
