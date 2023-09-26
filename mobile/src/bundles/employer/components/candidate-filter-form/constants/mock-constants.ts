import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';
import { type EmployeesFiltersForm } from '~/bundles/employer/types/types';

const DEFAULT_VALUES: EmployeesFiltersForm = {
    sortBy: '',
    isSearchActiveCandidatesOnly: true,
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

const BSA_PROJECTS: AutocompleteMultiSelectorValue[] = [
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'some', label: 'some' },
];

export { BSA_CHARACTERISTICS, BSA_PROJECTS, DEFAULT_VALUES };
