import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    type BadgesResponseDto,
    type HardSkillsResponseDto,
} from '~/bundles/gather-selected-data/types/types';

import { getBadgesData, getHardSkillsData } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    badgesData: BadgesResponseDto | [];
    hardSkillsData: HardSkillsResponseDto | [];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    badgesData: [],
    hardSkillsData: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'gather-selected-data',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getBadgesData.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.badgesData = [];
        });
        builder.addCase(getBadgesData.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.badgesData = payload;
        });
        builder.addCase(getBadgesData.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.badgesData = [];
        });
        builder.addCase(getHardSkillsData.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.hardSkillsData = [];
        });
        builder.addCase(getHardSkillsData.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.hardSkillsData = payload;
        });
        builder.addCase(getHardSkillsData.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.hardSkillsData = [];
        });
    },
});

export { actions, name, reducer };
