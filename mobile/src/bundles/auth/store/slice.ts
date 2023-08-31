import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type UserRole } from '~/bundles/users/enums/enums';

import { signUp } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    isSignedIn: boolean;
    role: null | ValueOf<typeof UserRole>;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    isSignedIn: false,
    role: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.isSignedIn = true;
            state.role = action.payload.role;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
