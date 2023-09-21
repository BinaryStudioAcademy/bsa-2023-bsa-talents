import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserDetailsGeneralCustom } from '~/bundles/employer-onboarding/types/types.js';

import { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD } from '../constants/constants.js';
import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import { searchCandidates, setFilters } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    filters: EmployeesFiltersDto;
    filteredCandidates: UserDetailsGeneralCustom[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    filters: DEFAULT_EMPLOYEES_FILTERS_PAYLOAD,
    filteredCandidates: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employers',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(searchCandidates.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.filteredCandidates = [];
            state.filteredCandidates.push(...action.payload);
        });
        builder.addCase(setFilters.fulfilled, (state, action) => {
            state.filters = action.payload;
        });
        builder.addCase(setFilters.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
    },
});

export { actions, name, reducer };
