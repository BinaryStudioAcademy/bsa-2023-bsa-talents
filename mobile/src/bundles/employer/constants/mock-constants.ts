// TODO: remove with real data
type Options = {
    label: string;
    value: string;
};
const YEARS_EXPERIENCE = ['>1', 'from 1 to 2', '2+'];
const BSA_CHARACTERISTICS = ['bad', 'good', 'great'];
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
const BSA_BADGES = [
    'Project average score',
    'Lecture average score',
    'Communication score',
    'Working with team score',
    'Level of english',
    'Punctuality',
];

const ENGLISH_LEVEL = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const BSA_PROJECT = [
    'Talents',
    'Writorium',
    'TowHub',
    'CalmPal',
    'EasyMeets',
    'LeetWars',
];
const DEFAULT_VALUES = {
    activeTalentsOnly: true,
    jobTitle: '',
    hardSkills: [],
    BSABadges: '',
    BSACharacteristics: '',
    location: '',
    BSAProjectName: '',
    englishLevel: [],
    experienceYears: '',
    employmentTypes: [],
};

export {
    BSA_BADGES,
    BSA_CHARACTERISTICS,
    BSA_PROJECT,
    DEFAULT_VALUES,
    ENGLISH_LEVEL,
    HARD_SKILLS,
    YEARS_EXPERIENCE,
};
