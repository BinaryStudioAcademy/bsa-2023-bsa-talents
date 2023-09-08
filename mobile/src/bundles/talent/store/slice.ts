import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    type ProfileStepDto,
    type UserDetailsResponseDto,
} from '~/bundles/talent/types/types';

import {
    createTalentDetails,
    setCompletedStep,
    updateOnboardingData,
} from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    onboardingData: UserDetailsResponseDto | null;
    completedStep: number;
    profileStepData: ProfileStepDto | null;
    //TODO add other steps
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    onboardingData: null,
    completedStep: 0,
    profileStepData: null,
    //TODO add other steps
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
                action.type === updateOnboardingData.fulfilled.type,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.profileStepData = {
                    ...action.payload,
                } as ProfileStepDto;
                //TODO add other steps
            },
        );
        builder.addMatcher(
            (action) =>
                action.type === createTalentDetails.pending.type ||
                action.type === updateOnboardingData.pending.type,
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            (action) =>
                action.type === createTalentDetails.rejected.type ||
                action.type === updateOnboardingData.rejected.type,
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
