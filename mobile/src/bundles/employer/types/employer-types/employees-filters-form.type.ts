import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';
import { type UserDetailsSearchUsersRequestDto } from '~/bundles/employer/types/types';

type SelectorValues = Omit<
    UserDetailsSearchUsersRequestDto,
    | 'englishLevel'
    | 'employmentType'
    | 'searchActiveCandidatesOnly'
    | 'sortBy'
    | 'isBaseSearch'
    | 'searchValue'
>;

type EmployeesFiltersForm = Pick<
    UserDetailsSearchUsersRequestDto,
    'searchActiveCandidatesOnly' | 'englishLevel' | 'employmentType'
> &
    Record<keyof SelectorValues, AutocompleteMultiSelectorValue[]>;

export { type EmployeesFiltersForm };
