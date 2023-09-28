import { createSlice } from '@reduxjs/toolkit';

import { type EmployerDataDto } from '../types/types.js';
import { getEmployerData } from './actions.js';

type State = {
    employers: EmployerDataDto[];
};

const initialState: State = {
    employers: [],
};
const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employers',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getEmployerData.fulfilled, (state, action) => {
            if (action.payload) {
                state.employers.push(action.payload);
            }
        });
    },
});

export { actions, name, reducer };
