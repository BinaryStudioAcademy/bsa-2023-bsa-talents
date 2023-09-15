type EmployeesFiltersDto = {
    searchType: string;
    searchValue: string;
    activeSearchingOnly: boolean;
    jobTitles: string[];
    userYearsOfExperience: string[];
    hardSkills: string[];
    userBsaCharacteristics: string[];
    userBsaBadges: string[];
    userBsaProject: string[];
    userLocation: string[];
    levelOfEnglish: string[];
    employmentType: string[];
    sortBy: string;
};

export { type EmployeesFiltersDto };
