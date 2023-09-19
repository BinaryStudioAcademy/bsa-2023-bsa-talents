import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    type BsaBadges,
    type HardSkills,
    type ValueOf,
} from '~/bundles/common/types/types.js';

import { getBsaBadges, getHardSkills } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    hardSkills: HardSkills;
    bsaBadges: BsaBadges;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    hardSkills: [],
    bsaBadges: [],
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
        builder.addCase(getBsaBadges.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.bsaBadges = action.payload;
        });
        builder.addCase(getBsaBadges.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
    },
});

export { actions, name, reducer };
