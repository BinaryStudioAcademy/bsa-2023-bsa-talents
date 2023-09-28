import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';

import { type MappedBSABadge, type ValueOf } from '../types/types.js';
import { getTalentBadges } from './actions.js';

type State = {
    talentBadges: MappedBSABadge[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    talentBadges: [],
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
    },
});

export { actions, name, reducer };
