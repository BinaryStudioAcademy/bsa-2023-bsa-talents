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
    const { searchCandidatesApi } = extra;
    return await searchCandidatesApi.searchUserDetails(filters);
});

const setFilters = createAsyncThunk<
    EmployeesFiltersDto,
    EmployeesFiltersDto,
    AsyncThunkConfig
>(`${sliceName}/set-filters`, (filters) => {
    return filters;
});

const getCandidateDetails = createAsyncThunk<
    UserDetailsGeneralCustom | null,
    {
        userId: string;
    },
    AsyncThunkConfig
>(
    `${sliceName}/get-candidate-details`,
    async (findPayload, { extra, rejectWithValue, getState }) => {
        const { searchCandidates } = getState();
        const { talentOnBoardingApi } = extra;
        if (searchCandidates.filteredCandidates.length > 0) {
            return (
                searchCandidates.filteredCandidates.find(
                    (candidate) => candidate.userId == findPayload.userId,
                ) ?? null
            );
        }
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
