import { createSlice } from '@reduxjs/toolkit';
import { type LMSDataServerResponseDto } from 'shared/build/index.js';

import { mockBadges } from '~/assets/mock-data/mock-data.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/framework/socket/types/types.js';

import { type BSABadge } from '../types/types.js';
import { getTalentLmsData } from './actions.js';

type State = {
    lmsData: LMSDataServerResponseDto | null;
    bsaBadges: BSABadge[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    lmsData: null,
    bsaBadges: mockBadges,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'lms',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTalentLmsData.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.lmsData = action.payload;
        });
    },
});

export { actions, name, reducer };
