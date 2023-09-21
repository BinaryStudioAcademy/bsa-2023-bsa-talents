import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/components/autocomplete-multi-selector-value';
import { type EmployeesFiltersDto } from '~/bundles/employer/types/types';

// TODO: remove with real data

const YEARS_EXPERIENCE: AutocompleteMultiSelectorValue[] = [
    { id: 'any', name: 'Any work experience' },
    { id: '>1', name: 'Less than 1 year' },
    { id: '1-2', name: '1-2 years' },
    { id: '2-3', name: '2-3 years' },
    { id: '3-5', name: '3-5 years' },
    { id: '5>', name: '5+ years' },
];
const BSA_CHARACTERISTICS: AutocompleteMultiSelectorValue[] = [
    { id: 'one', name: 'one' },
    { id: 'two', name: 'two' },
    { id: 'some', name: 'some' },
];

const ENGLISH_LEVEL = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const BSA_PROJECT: AutocompleteMultiSelectorValue[] = [
    { id: 'one', name: 'one' },
    { id: 'two', name: 'two' },
    { id: 'some', name: 'some' },
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
