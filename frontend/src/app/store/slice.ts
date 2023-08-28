import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { notify } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'app',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(notify.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(notify.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(notify.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
