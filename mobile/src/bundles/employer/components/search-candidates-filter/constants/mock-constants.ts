const YEARS_EXPERIENCE = ['< 1', 'from 1 to 2', '2+'];

const BSA_CHARACTERISTICS = ['bad', 'good', 'great'];

const BSA_BADGES = [
    'Project average score',
    'Lecture average score',
    'Communication score',
    'Working with team score',
    'Level of english',
    'Punctuality',
];

const RADIO_BUTTONS = [
    {
        id: 'a1',
        label: 'A1',
    },
    {
        id: 'a2',
        label: 'A2',
    },
    {
        id: 'b1',
        label: 'B1',
    },
    {
        id: 'b2',
        label: 'B2',
    },
    {
        id: 'c1',
        label: 'C1',
    },
    {
        id: 'c2',
        label: 'C2',
    },
];

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
    hardSkills: '',
    BSABadges: '',
    BSACharacteristics: '',
    location: '',
    BSAProjectName: '',
    englishLevel: '',
    experienceYears: '',
    employmentTypes: [],
};

export {
    BSA_BADGES,
    BSA_CHARACTERISTICS,
    BSA_PROJECT,
    DEFAULT_VALUES,
    RADIO_BUTTONS,
    YEARS_EXPERIENCE,
};
