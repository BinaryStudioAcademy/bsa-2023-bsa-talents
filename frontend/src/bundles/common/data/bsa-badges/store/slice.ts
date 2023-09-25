import { createSlice } from '@reduxjs/toolkit';

import { type BsaBadgesResponseDto } from '~/bundles/common/data/types/types.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { getBsaBadgesData } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    bsaBadgesData: BsaBadgesResponseDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    bsaBadgesData: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'bsa-badges',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getBsaBadgesData.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.bsaBadgesData = action.payload;
        });
        builder.addCase(getBsaBadgesData.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getBsaBadgesData.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
