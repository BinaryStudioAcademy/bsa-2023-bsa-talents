import { UserSortCriteria } from '~/bundles/employer/enums/enums';
import { type EmployeesFiltersForm } from '~/bundles/employer/types/types';

const getSortSearchQuery = (label: string | undefined): string => {
    if (!label) {
        return '';
    }
    const sortValue = Object.values(UserSortCriteria).find(
        (sortCriteria) => sortCriteria.label === label,
    );
    return `&sortBy=${sortValue?.value}`;
};

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
        isSearchActiveCandidatesOnly,
        hardSkills,
        sortBy,
        ...multiSelectedData
    } = formData;

    let result = `?isSearchActiveCandidatesOnly=${isSearchActiveCandidatesOnly}`;
    result += getFilterSearchQuery(englishLevel, 'englishLevel');
    result += getFilterSearchQuery(employmentType, 'employmentType');
    result += getSortSearchQuery(sortBy);

    if (hardSkills.length > 0) {
        for (const value of hardSkills) {
            result += `&hardSkills=${value.value}`;
        }
    }

    for (const [key, value] of Object.entries(multiSelectedData)) {
        if (value.length > 0) {
            for (const selector of value) {
                result += `&${key}=${selector.label}`;
            }
        }
    }

    return result;
};

export { transformCandidateFilterFormToQuery };
