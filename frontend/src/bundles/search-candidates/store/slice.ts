import { createSlice } from '@reduxjs/toolkit';

import { getContactWithTalent } from '~/bundles/candidate-details/store/actions.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    getHiringInfo,
    submitHiringInfo,
} from '~/bundles/hiring-info/store/actions.js';

import { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD } from '../constants/constants.js';
import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import { type SeacrhCandidateResponse } from '../types/types.js';
import {
    getCandidateDetails,
    searchCandidates,
    setFilters,
} from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    filters: EmployeesFiltersDto;
    currentCandidateDetails:
        | (SeacrhCandidateResponse & {
              hasSharedContacts?: boolean;
              isHired: boolean;
          })
        | null;
    filteredCandidates: SeacrhCandidateResponse[];
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
    reducers: {
        clearCurrentCandidate: (state) => {
            state.currentCandidateDetails = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(searchCandidates.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.filteredCandidates = [];
            state.filteredCandidates.push(...action.payload);
        });
        builder.addCase(getCandidateDetails.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            if (action.payload) {
                state.currentCandidateDetails = {
                    ...action.payload,
                    isHired: state.currentCandidateDetails?.isHired ?? false,
                };
            }
        });

        builder.addCase(getCandidateDetails.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
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
        builder.addCase(getHiringInfo.fulfilled, (state, action) => {
            if (state.currentCandidateDetails) {
                state.currentCandidateDetails = {
                    ...state.currentCandidateDetails,
                    isHired: action.payload,
                };
            }
        });
        builder.addCase(submitHiringInfo.fulfilled, (state) => {
            if (state.currentCandidateDetails) {
                state.currentCandidateDetails.isHired = true;
            }
        });
    },
});

export { actions, name, reducer };
