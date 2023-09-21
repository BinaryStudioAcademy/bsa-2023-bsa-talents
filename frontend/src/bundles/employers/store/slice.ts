import { createSlice } from '@reduxjs/toolkit';

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
    currentCandidateDetails: UserDetailsGeneralCustom | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    filters: DEFAULT_EMPLOYEES_FILTERS_PAYLOAD,
    currentCandidateDetails: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employers',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(searchCandidates.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
            //TODO: set here also candidates which will be returned from server
        });
        builder.addCase(getCandidateDetails.fulfilled, (state, action) => {
            state.currentCandidateDetails = action.payload;
        });
        builder.addCase(searchCandidates.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });

        builder.addCase(setFilters.fulfilled, (state, action) => {
            state.filters = action.payload;
        });
    },
});

export { actions, name, reducer };
