import { type EmployeesFiltersForm } from '~/bundles/employer/types/types';

const getFilterSearchQuery = (
    queryValues: string[] | undefined,
    queryString: string,
): string => {
    if (!queryValues || queryValues.length === 0) {
        return '';
    }
    let searchQuery = '';
    for (const value of queryValues) {
        searchQuery += `&${queryString}=${value}`;
    }
    return searchQuery;
};

const transformCandidateFilterFormToQuery = (
    formData: EmployeesFiltersForm,
): string => {
    const {
        employmentType,
        englishLevel,
        searchActiveCandidatesOnly,
        hardSkills,
        ...multiSelectedData
    } = formData;

    let result = `?searchActiveCandidatesOnly=${searchActiveCandidatesOnly}`;
    result += getFilterSearchQuery(englishLevel, 'englishLevel');
    result += getFilterSearchQuery(employmentType, 'employmentType');

    if (hardSkills.length > 0) {
        for (const value of hardSkills) {
            result += `&hardSkills=${value.id}`;
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
