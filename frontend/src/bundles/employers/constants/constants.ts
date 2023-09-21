import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';

const DEFAULT_EMPLOYEES_FILTERS_PAYLOAD: EmployeesFiltersDto = {
    searchType: 'Basic search',
    searchValue: '',
    searchActiveCandidatesOnly: false,
    jobTitle: [],
    yearsOfExperience: [],
    hardSkills: [],
    userBsaCharacteristics: [],
    userBsaProject: [],
    location: [],
    englishLevel: [],
    employmentType: [],
    sortBy: undefined,
};

export { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD };
