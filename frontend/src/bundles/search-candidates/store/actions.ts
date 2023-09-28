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
    (SeacrhCandidateResponse & { hasSharedContacts?: boolean }) | null,
    {
        userId: string;
        companyId?: string;
    },
    AsyncThunkConfig
>(
    `${sliceName}/get-candidate-details`,
    async ({ userId, companyId }, { extra, rejectWithValue, getState }) => {
        const { searchCandidates } = getState();
        const { talentOnBoardingApi, candidateApi } = extra;

        if (searchCandidates.filteredCandidates.length > MIN_LENGTH) {
            return (
                searchCandidates.filteredCandidates.find(
                    (candidate) => candidate.userId == userId,
                ) ?? null
            );
        }

        try {
            const userDetails =
                (await talentOnBoardingApi.getUserDetailsByUserId({
                    userId,
                })) as
                    | (SeacrhCandidateResponse & {
                          hasSharedContacts?: boolean;
                      })
                    | null;

            if (userDetails) {
                const hasContact = await candidateApi.getContactWithTalent({
                    talentId: userId,
                    companyId: companyId as string,
                });

                userDetails.hasSharedContacts = hasContact;
            }

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
