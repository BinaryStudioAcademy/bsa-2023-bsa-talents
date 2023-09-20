import {
    type EmployeesFilterOption,
    type EmployeesFiltersDto,
} from '~/bundles/employer/types/types';

// TODO: remove with real data

const YEARS_EXPERIENCE: EmployeesFilterOption[] = [
    { value: 'any', label: 'Any work experience' },
    { value: '>1', label: 'Less than 1 year' },
    { value: '1-2', label: '1-2 years' },
    { value: '2-3', label: '2-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5>', label: '5+ years' },
];
const BSA_CHARACTERISTICS: EmployeesFilterOption[] = [
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'some', label: 'some' },
];
const HARD_SKILLS: EmployeesFilterOption[] = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'Ruby', label: 'Ruby' },
];
const BSA_BADGES: EmployeesFilterOption[] = [
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'some', label: 'some' },
];

const ENGLISH_LEVEL = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const BSA_PROJECT: EmployeesFilterOption[] = [
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'some', label: 'some' },
];

const DEFAULT_VALUES: EmployeesFiltersDto = {
    activeTalentsOnly: true,
    jobTitle: [],
    hardSkills: [],
    BSABadges: [],
    BSACharacteristics: [],
    location: [],
    BSAProjectName: [],
    englishLevel: [],
    experienceYears: [],
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
