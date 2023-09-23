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
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'some', label: 'some' },
];

const USER_BSA_PROJECTS: AutocompleteMultiSelectorValue[] = [
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'some', label: 'some' },
];

export { BSA_CHARACTERISTICS, DEFAULT_VALUES, USER_BSA_PROJECTS };
