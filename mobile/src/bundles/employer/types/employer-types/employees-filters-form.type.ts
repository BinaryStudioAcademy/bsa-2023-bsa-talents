import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';

type EmployeesFiltersForm = {
    searchActiveCandidatesOnly: boolean;
    jobTitle: AutocompleteMultiSelectorValue[];
    hardSkills: AutocompleteMultiSelectorValue[];
    userBsaCharacteristics: AutocompleteMultiSelectorValue[];
    location: AutocompleteMultiSelectorValue[];
    userBsaProject: AutocompleteMultiSelectorValue[];
    englishLevel: string[];
    yearsOfExperience: AutocompleteMultiSelectorValue[];
    employmentType: string[];
};

export { type EmployeesFiltersForm };
