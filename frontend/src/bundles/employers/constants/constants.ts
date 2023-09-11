import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';

const DEFAULT_EMPLOYEES_FILTERS_PAYLOAD: EmployeesFiltersDto = {
    activeSearchingOnly: true,
    jobTitles: [],
    userYearsOfExperience: [],
    hardSkills: [],
    userBsaCharacteristics: [],
    userBsaBadges: [],
    userBsaProject: [],
    userLocation: [],
    levelOfEnglish: [],
    employmentType: [],
};

export { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD };
