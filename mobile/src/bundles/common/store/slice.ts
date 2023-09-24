import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type UserDetailsGeneralResponseDto } from '~/bundles/talent/types/types';

import {
    clearCommonStore,
    createUserDetails,
    getUserDetails,
    updateOnboardingData,
} from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    onboardingData: UserDetailsGeneralResponseDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    onboardingData: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'common',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(clearCommonStore, (state) => {
            state.dataStatus = DataStatus.IDLE;
            state.onboardingData = null;
        });
        builder.addMatcher(
            (action) =>
                [
                    createUserDetails.fulfilled.type,
                    updateOnboardingData.fulfilled.type,
                    getUserDetails.fulfilled.type,
                ].includes(action.type),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.onboardingData = {
                    ...state.onboardingData,
                    ...action.payload,
                };
            },
        );
        builder.addMatcher(
            isAnyOf(
                createUserDetails.pending,
                updateOnboardingData.pending,
                getUserDetails.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                createUserDetails.rejected,
                updateOnboardingData.rejected,
                getUserDetails.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
