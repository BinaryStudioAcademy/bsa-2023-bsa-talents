import { createSlice } from '@reduxjs/toolkit';

import { type HiringInfoFindRequestDto } from '../types/types.js';
import { getAllHiringInfo } from './actions.js';

type State = {
    hiringInfo: HiringInfoFindRequestDto[];
};

const initialState: State = {
    hiringInfo: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'admin',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllHiringInfo.fulfilled, (state, action) => {
            state.hiringInfo = action.payload;
        });
    },
});

export { actions, name, reducer };
