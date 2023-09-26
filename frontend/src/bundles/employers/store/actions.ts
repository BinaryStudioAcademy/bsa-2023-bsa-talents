import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type UserDetailsGeneralCustom } from '~/bundles/employer-onboarding/types/types.js';

import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import { type UserDetailsSearchUsersRequestDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const searchCandidates = createAsyncThunk<
    UserDetailsGeneralCustom[],
    UserDetailsSearchUsersRequestDto,
    AsyncThunkConfig
>(`${sliceName}/search-candidates`, async (filters, { extra }) => {
    const { employersApi } = extra;
    return await employersApi.searchUserDetails(filters);
});

const setFilters = createAsyncThunk<
    EmployeesFiltersDto,
    EmployeesFiltersDto,
    AsyncThunkConfig
>(`${sliceName}/set-filters`, (filters) => {
    return filters;
});

export { searchCandidates, setFilters };
