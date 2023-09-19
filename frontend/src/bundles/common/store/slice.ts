import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type HardSkills } from '../types/hard-skills.type.js';
import { getHardSkills } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    hardSkills: HardSkills;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    hardSkills: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'common',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getHardSkills.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.hardSkills = action.payload;
        });
        builder.addCase(getHardSkills.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
    },
});

export { actions, name, reducer };
