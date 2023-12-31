import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import {
    type UserDetailsGeneralResponseDto,
    type UserDetailsResponseDto,
    type ValueOf,
} from '~/bundles/common/types/types';

import {
    clearCommonStore,
    createUserDetails,
    getUserDetails,
    updateOnboardingData,
    updatePublishedData,
} from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    onboardingData: UserDetailsGeneralResponseDto | null;
    talentsData: UserDetailsResponseDto[] | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    onboardingData: null,
    talentsData: null,
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
                    updatePublishedData.fulfilled.type,
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
                updatePublishedData.pending,
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
                updatePublishedData.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
