import { createSlice } from '@reduxjs/toolkit';

import { type HardSkillsResponseDto } from '~/bundles/common/data/types/types.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { getHardSkillsData } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    hardSkillsData: HardSkillsResponseDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    hardSkillsData: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'hard-skills',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getHardSkillsData.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.hardSkillsData = action.payload;
        });
        builder.addCase(getHardSkillsData.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getHardSkillsData.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
