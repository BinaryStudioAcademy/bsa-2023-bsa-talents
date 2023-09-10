import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type UserDetailsResponseDto } from '~/bundles/talent/types/types';

import {
    createTalentDetails,
    getTalentDetails,
    setCompletedStep,
    updateOnboardingData,
} from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    onboardingData: UserDetailsResponseDto | null;
    completedStep: number;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    onboardingData: null,
    completedStep: 0,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talents',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(setCompletedStep, (state, action) => {
            state.completedStep = action.payload;
        });
        builder.addMatcher(
            (action) =>
                action.type === createTalentDetails.fulfilled.type ||
                action.type === updateOnboardingData.fulfilled.type ||
                action.type === getTalentDetails.fulfilled.type,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.onboardingData = action.payload;
            },
        );
        builder.addMatcher(
            (action) =>
                action.type === createTalentDetails.pending.type ||
                action.type === updateOnboardingData.pending.type ||
                action.type === getTalentDetails.pending.type,
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            (action) =>
                action.type === createTalentDetails.rejected.type ||
                action.type === updateOnboardingData.rejected.type ||
                action.type === getTalentDetails.rejected.type,
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
