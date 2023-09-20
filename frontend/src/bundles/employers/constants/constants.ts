import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';

const DEFAULT_EMPLOYEES_FILTERS_PAYLOAD: EmployeesFiltersDto = {
    searchType: 'Basic search',
    searchValue: '',
    activeSearchingOnly: false,
    jobTitles: [],
    userYearsOfExperience: [],
    hardSkills: [],
    userBsaCharacteristics: [],
    userBsaBadges: [],
    userBsaProject: [],
    userLocation: [],
    levelOfEnglish: [],
    employmentType: [],
    sortBy: '',
};

export { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD };
