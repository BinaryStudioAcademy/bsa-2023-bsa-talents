import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD } from '../constants/constants.js';
import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import { type EmployerDataDto } from '../types/types.js';
import { getEmployerData, searchCandidates, setFilters } from './actions.js';

type State = {
    employers: EmployerDataDto[];
    dataStatus: ValueOf<typeof DataStatus>;
    filters: EmployeesFiltersDto;
};

const initialState: State = {
    employers: [],
    dataStatus: DataStatus.IDLE,
    filters: DEFAULT_EMPLOYEES_FILTERS_PAYLOAD,
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
        builder.addCase(searchCandidates.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });

        builder.addCase(setFilters.fulfilled, (state, action) => {
            state.filters = action.payload;
        });
        builder.addCase(getEmployerData.fulfilled, (state, action) => {
            if (action.payload) {
                state.employers.push(action.payload);
            }
        });
    },
});

export { actions, name, reducer };
