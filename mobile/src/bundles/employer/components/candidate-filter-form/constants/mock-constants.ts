import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';
import { type EmployeesFiltersForm } from '~/bundles/employer/types/types';

const DEFAULT_VALUES: EmployeesFiltersForm = {
    searchActiveCandidatesOnly: true,
    jobTitle: [],
    hardSkills: [],
    userBsaCharacteristics: [],
    location: [],
    userBsaProject: [],
    englishLevel: [],
    yearsOfExperience: [],
    employmentType: [],
};

// TODO: replace from common data, when backend will be ready

const HARD_SKILLS: AutocompleteMultiSelectorValue[] = [
    { name: 'React', id: 'React' },
    { name: 'Node.js', id: 'Node.js' },
    { name: 'JavaScript', id: 'JavaScript' },
    { name: 'HTML', id: 'HTML' },
    { name: 'CSS', id: 'CSS' },
    { name: 'Python', id: 'Python' },
    { name: 'Java', id: 'Java' },
    { name: 'Ruby', id: 'Ruby' },
];

export { DEFAULT_VALUES, HARD_SKILLS };
