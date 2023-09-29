import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';

import {
    type MappedBSABadge,
    type UserLMSDataDto,
    type ValueOf,
} from '../types/types.js';
import { getTalentBadges, getTalentLmsData } from './actions.js';

type State = {
    talentBadges: MappedBSABadge[];
    lmsData: UserLMSDataDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    talentBadges: [],
    lmsData: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'lms',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTalentBadges.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.talentBadges = action.payload;
        }),
            builder.addCase(getTalentBadges.pending, (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            }),
            builder.addCase(getTalentBadges.rejected, (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            });
        builder.addCase(getTalentLmsData.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.lmsData = action.payload;
        });
    },
});

export { actions, name, reducer };
