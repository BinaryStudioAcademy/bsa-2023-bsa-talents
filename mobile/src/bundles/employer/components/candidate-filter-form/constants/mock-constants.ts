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

// TODO: replace when backend will be ready
const BSA_CHARACTERISTICS: AutocompleteMultiSelectorValue[] = [
    { name: 'FIRST', id: 'first' },
    { name: 'SECOND', id: 'second' },
    { name: 'THIRD', id: 'third' },
];

const USER_BSA_PROJECTS: AutocompleteMultiSelectorValue[] = [
    { name: 'FIRST', id: 'first' },
    { name: 'SECOND', id: 'second' },
    { name: 'THIRD', id: 'third' },
];

export { BSA_CHARACTERISTICS, DEFAULT_VALUES, USER_BSA_PROJECTS };
