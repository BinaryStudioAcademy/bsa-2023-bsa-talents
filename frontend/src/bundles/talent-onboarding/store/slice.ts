import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_PAYLOAD_BSA_BADGES_STEP } from '~/bundles/talent-onboarding/components/bsa-badges-step/constants/constants.js';
import { DEFAULT_PAYLOAD_PROFILE_STEP } from '~/bundles/talent-onboarding/components/profile-step/constants/constants.js';

import { mockBadges } from '../../lms/mock-data/mock-data.js';
import { type BsaBadgesStepDto, type ProfileStepDto } from '../types/types.js';
import { bsaBadgesStep, profileStep } from './actions.js';

type State = {
    profileStep: ProfileStepDto;
    bsaBadgesStep: BsaBadgesStepDto;
};

//TODO: here service badges are set as default state
const DEFAULT_PAYLOAD_BSA_BADGES = {
    ...DEFAULT_PAYLOAD_BSA_BADGES_STEP,
    bsaBadges: mockBadges
        .filter((badge) => badge.type === 'service')
        .map((badge) => badge.id),
};

const initialState: State = {
    profileStep: DEFAULT_PAYLOAD_PROFILE_STEP,
    bsaBadgesStep: DEFAULT_PAYLOAD_BSA_BADGES,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talentOnBoarding',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(profileStep.fulfilled, (state, action) => {
            state.profileStep = action.payload;
        });
        builder.addCase(bsaBadgesStep.fulfilled, (state, action) => {
            state.bsaBadgesStep = action.payload;
        });
    },
});

export { actions, name, reducer };
