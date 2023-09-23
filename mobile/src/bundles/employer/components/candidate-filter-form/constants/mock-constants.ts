import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/components/autocomplete-multi-selector-value';
import { type EmployeesFiltersDto } from '~/bundles/employer/types/types';

// TODO: remove with real data

const YEARS_EXPERIENCE: AutocompleteMultiSelectorValue[] = [
    { value: 'any', label: 'Any work experience' },
    { value: '>1', label: 'Less than 1 year' },
    { value: '1-2', label: '1-2 years' },
    { value: '2-3', label: '2-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5>', label: '5+ years' },
];
const BSA_CHARACTERISTICS: AutocompleteMultiSelectorValue[] = [
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'some', label: 'some' },
];

const ENGLISH_LEVEL = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const BSA_PROJECT: AutocompleteMultiSelectorValue[] = [
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'some', label: 'some' },
];

const DEFAULT_VALUES: EmployeesFiltersDto = {
    activeTalentsOnly: true,
    jobTitle: [],
    hardSkills: [],
    BSACharacteristics: [],
    location: [],
    BSAProjectName: [],
    englishLevel: [],
    experienceYears: [],
    employmentTypes: [],
};

export {
    BSA_CHARACTERISTICS,
    BSA_PROJECT,
    DEFAULT_VALUES,
    ENGLISH_LEVEL,
    YEARS_EXPERIENCE,
};
