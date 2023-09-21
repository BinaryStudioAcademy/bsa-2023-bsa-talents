import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type UserDetailsGeneralCustom } from '~/bundles/talent-onboarding/types/types.js';

import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import { type UserDetailsSearchUsersRequestDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const searchCandidates = createAsyncThunk<
    UserDetailsGeneralCustom[],
    UserDetailsSearchUsersRequestDto,
    AsyncThunkConfig
>(`${sliceName}/search-candidates`, async (filters, { extra }) => {
    const { employersApi } = extra;

    // TODO: call search candidates API. For now, we're just returning the filters
    //console.log('api call', filters);

    return await employersApi.searchUserDetails(filters);
});

const setFilters = createAsyncThunk<
    UserDetailsSearchUsersRequestDto,
    EmployeesFiltersDto,
    AsyncThunkConfig
>(`${sliceName}/set-filters`, (filters) => {
    return filters;
});

const getCandidateDetails = createAsyncThunk<
    UserDetailsGeneralCustom | null,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/get-candidate-details`,
    async (findPayload, { extra, rejectWithValue }) => {
        const { talentOnBoardingApi } = extra;

        try {
            const userDetails =
                await talentOnBoardingApi.getUserDetailsByUserId({
                    userId: findPayload.userId,
                });

            return userDetails ?? null;
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            return null;
        }
    },
);

export { getCandidateDetails, searchCandidates, setFilters };
