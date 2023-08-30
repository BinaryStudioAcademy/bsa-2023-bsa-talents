import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type UserSignUpResponseDto } from '~/bundles/users/users';

import { signUp } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: null | UserSignUpResponseDto;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: null,
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
            state.user = action.payload;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.user = null;
        });
    },
});

export { actions, name, reducer };
