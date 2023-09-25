import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';
import { type UserDetailsSearchUsersRequestDto } from '~/bundles/employer/types/types';

type SelectorValues = Omit<
    UserDetailsSearchUsersRequestDto,
    | 'englishLevel'
    | 'employmentType'
    | 'isSearchActiveCandidatesOnly'
    | 'sortBy'
    | 'isBaseSearch'
    | 'searchValue'
    | 'BSABadges'
>;

type EmployeesFiltersForm = Pick<
    UserDetailsSearchUsersRequestDto,
    | 'isSearchActiveCandidatesOnly'
    | 'englishLevel'
    | 'employmentType'
    | 'sortBy'
> &
    Record<keyof SelectorValues, AutocompleteMultiSelectorValue[]>;

export { type EmployeesFiltersForm };
