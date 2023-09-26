import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
    type UserDetailsFullResponseDto,
    type UserDetailsShortResponseDto,
} from '../types/types.js';
import {
    approveUser,
    denyUser,
    getFullUserDetails,
    getShortUserDetails,
} from './actions.js';

type InitialState = {
    shortDetails: UserDetailsShortResponseDto[];
    fullDetails: UserDetailsFullResponseDto | null;
};

const initialState: InitialState = {
    shortDetails: [],
    fullDetails: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'admin',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getShortUserDetails.fulfilled, (state, action) => {
            state.shortDetails = action.payload;
        });
        builder.addCase(getFullUserDetails.fulfilled, (state, action) => {
            state.fullDetails = action.payload;
        });
        builder.addMatcher(
            isAnyOf(approveUser.fulfilled, denyUser.fulfilled),
            (state, action) => {
                const { userId } =
                    action.payload as Partial<UserDetailsFullResponseDto>;
                state.shortDetails = state.shortDetails.filter(
                    (it) => it.userId !== userId,
                );
                state.fullDetails = null;
            },
        );
    },
});

export { actions, name, reducer };
