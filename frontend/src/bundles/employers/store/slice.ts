import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD } from '../constants/constants.js';
import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import { searchCandidates } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    searchFiltersValues: EmployeesFiltersDto;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    searchFiltersValues: DEFAULT_EMPLOYEES_FILTERS_PAYLOAD,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employers',
    reducers: {
        searchFiltersValuesReset: (state) => {
            state.searchFiltersValues = DEFAULT_EMPLOYEES_FILTERS_PAYLOAD;
        },
    },
    extraReducers(builder) {
        builder.addCase(searchCandidates.fulfilled, (state, actions) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.searchFiltersValues = actions.payload;
        });
        builder.addCase(searchCandidates.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
    },
});

export { actions, name, reducer };
