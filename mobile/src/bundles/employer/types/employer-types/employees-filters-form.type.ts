import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';
import { type UserDetailsSearchUsersRequestDto } from '~/bundles/employer/types/types';

type SelectorValues = Omit<
    UserDetailsSearchUsersRequestDto,
    | 'englishLevel'
    | 'employmentType'
    | 'searchType'
    | 'sortBy'
    | 'isBaseSearch'
    | 'searchValue'
    | 'BSABadges'
    | 'searchStringType'
>;

type EmployeesFiltersForm = Pick<
    UserDetailsSearchUsersRequestDto,
    'searchType' | 'englishLevel' | 'employmentType' | 'sortBy'
> &
    Record<keyof SelectorValues, AutocompleteMultiSelectorValue[]>;

export { type EmployeesFiltersForm };
