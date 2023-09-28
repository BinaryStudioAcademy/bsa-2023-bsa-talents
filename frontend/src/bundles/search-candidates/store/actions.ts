import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import {
    type SeacrhCandidateResponse,
    type UserDetailsSearchUsersRequestDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const MIN_LENGTH = 0;
const searchCandidates = createAsyncThunk<
    SeacrhCandidateResponse[],
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
    SeacrhCandidateResponse | null,
    {
        userId: string;
    },
    AsyncThunkConfig
>(
    `${sliceName}/get-candidate-details`,
    async (findPayload, { extra, rejectWithValue, getState }) => {
        const { searchCandidates } = getState();
        const { searchCandidatesApi } = extra;
        if (searchCandidates.filteredCandidates.length > MIN_LENGTH) {
            return (
                searchCandidates.filteredCandidates.find(
                    (candidate) => candidate.userId == findPayload.userId,
                ) ?? null
            );
        }
        try {
            return await searchCandidatesApi.getCandidateDetailsByUserId({
                userId: findPayload.userId,
            });
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
