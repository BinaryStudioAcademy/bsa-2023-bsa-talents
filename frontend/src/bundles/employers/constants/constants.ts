import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';

const DEFAULT_EMPLOYEES_FILTERS_PAYLOAD: EmployeesFiltersDto = {
    searchStringType: 'Basic search',
    searchValue: '',
    searchType: 'active',
    jobTitle: [],
    yearsOfExperience: [],
    hardSkills: [],
    userBsaCharacteristics: [],
    userBsaProject: [],
    location: [],
    englishLevel: [],
    employmentType: [],
    sortBy: '',
};

export { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD };
