import { type EmployeesFiltersForm } from '~/bundles/employer/types/types';

const transformCandidateFilterFormToQuery = (
    formData: EmployeesFiltersForm,
): string => {
    const {
        employmentType,
        englishLevel,
        searchActiveCandidatesOnly,
        ...multiSelectedData
    } = formData;
    let result = `?searchActiveCandidatesOnly=${searchActiveCandidatesOnly}`;
    if (englishLevel?.length) {
        for (const value of englishLevel) {
            result += `&englishLevel=${value}`;
        }
    }
    if (employmentType?.length) {
        for (const value of employmentType) {
            result += `&employmentType=${value}`;
        }
    }

    for (const [key, value] of Object.entries(multiSelectedData)) {
        if (value.length > 0) {
            for (const selector of value) {
                result += `&${key}=${selector.name}`;
            }
        }
    }

    return result;
};

export { transformCandidateFilterFormToQuery };
