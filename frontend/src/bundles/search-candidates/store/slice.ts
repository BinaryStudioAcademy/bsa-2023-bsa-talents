import { createSlice } from '@reduxjs/toolkit';

import { getContactWithTalent } from '~/bundles/candidate-details/store/actions.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserDetailsGeneralCustom } from '~/bundles/talent-onboarding/types/types.js';

import { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD } from '../constants/constants.js';
import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import {
    getCandidateDetails,
    searchCandidates,
    setFilters,
} from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    filters: EmployeesFiltersDto;
    currentCandidateDetails:
        | (UserDetailsGeneralCustom & {
              hasSharedContacts: boolean;
          })
        | null;
    filteredCandidates: UserDetailsGeneralCustom[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    filters: DEFAULT_EMPLOYEES_FILTERS_PAYLOAD,
    currentCandidateDetails: null,
    filteredCandidates: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'searchCandidates',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(searchCandidates.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.filteredCandidates = [];
            state.filteredCandidates.push(...action.payload);
        });
        builder.addCase(getCandidateDetails.fulfilled, (state, action) => {
            if (action.payload) {
                state.currentCandidateDetails = {
                    ...action.payload,
                    hasSharedContacts:
                        state.currentCandidateDetails?.hasSharedContacts ??
                        false,
                };
            }
        });

        builder.addCase(searchCandidates.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });

        builder.addCase(setFilters.fulfilled, (state, action) => {
            state.filters = action.payload;
        });
        builder.addCase(setFilters.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getContactWithTalent.fulfilled, (state, action) => {
            if (state.currentCandidateDetails) {
                state.currentCandidateDetails.hasSharedContacts =
                    action.payload;
            }
        });
    },
});

export { actions, name, reducer };
