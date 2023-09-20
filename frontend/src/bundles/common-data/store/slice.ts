import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import {
    type BsaBadgesResponseDto,
    type HardSkillsResponseDto,
} from '../types/types.js';
import { getBsaBadgesData, getHardSkillsData } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    hardSkillsData: HardSkillsResponseDto | null;
    bsaBadgesData: BsaBadgesResponseDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    hardSkillsData: null,
    bsaBadgesData: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'common-data',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getHardSkillsData.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.hardSkillsData = action.payload;
        });
        builder.addCase(getHardSkillsData.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getBsaBadgesData.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.bsaBadgesData = action.payload;
        });
        builder.addCase(getBsaBadgesData.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
    },
});

export { actions, name, reducer };
