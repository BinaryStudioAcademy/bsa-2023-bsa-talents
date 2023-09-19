import { type EmployeesFilterOption } from './employees-filters-option';

// TODO: Change with real data
type EmployeesFiltersDto = {
    activeTalentsOnly: boolean;
    jobTitle: EmployeesFilterOption[];
    hardSkills: EmployeesFilterOption[];
    BSABadges: EmployeesFilterOption[];
    BSACharacteristics: EmployeesFilterOption[];
    location: EmployeesFilterOption[];
    BSAProjectName: EmployeesFilterOption[];
    englishLevel: string[];
    experienceYears: EmployeesFilterOption[];
    employmentTypes: string[];
};

export { type EmployeesFiltersDto };
