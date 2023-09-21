// TODO: Change with real data
import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';

type EmployeesFiltersDto = {
    activeTalentsOnly: boolean;
    jobTitle: AutocompleteMultiSelectorValue[];
    hardSkills: AutocompleteMultiSelectorValue[];
    BSACharacteristics: AutocompleteMultiSelectorValue[];
    location: AutocompleteMultiSelectorValue[];
    BSAProjectName: AutocompleteMultiSelectorValue[];
    englishLevel: string[];
    experienceYears: AutocompleteMultiSelectorValue[];
    employmentTypes: string[];
};

export { type EmployeesFiltersDto };
