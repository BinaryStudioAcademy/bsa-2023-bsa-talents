import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    type UserDetailsFindRequestDto,
    type UserDetailsUpdateRequestDto,
} from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';

import { DEFAULT_PAYLOAD_BSA_BADGES_STEP } from '../components/badges-step/constants/constants.js';
import { DEFAULT_CONTACTS_CV_STEP_PAYLOAD } from '../components/contacts-cv-step/constants/constants.js';
import { DEFAULT_PAYLOAD_PROFILE_STEP } from '../components/profile-step/constants/default.constants.js';
import { DEFAULT_PAYLOAD_SKILLS_STEP } from '../components/skills-step/constants/default.constants.js';
import { fromUrlLinks } from '../helpers/helpers.js';
import { mockBadges } from '../mock-data/mock-data.js';
import { type UserDetailsGeneralCustom } from '../types/types.js';
import { getTalentDetails, updateTalentDetails } from './actions.js';

const initialState: UserDetailsGeneralCustom = {
    ...DEFAULT_PAYLOAD_PROFILE_STEP,
    ...DEFAULT_PAYLOAD_BSA_BADGES_STEP,
    badges: mockBadges
        .filter((badge) => badge.type === 'service')
        .map((badge) => badge.id),
    ...DEFAULT_PAYLOAD_SKILLS_STEP,
    projectLinks: fromUrlLinks(DEFAULT_PAYLOAD_SKILLS_STEP.projectLinks),
    ...DEFAULT_CONTACTS_CV_STEP_PAYLOAD,
    dataStatus: DataStatus.IDLE,
    completedStep: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talentOnBoarding',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(updateTalentDetails.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;

            for (const key in action.payload) {
                const typedKey = key as keyof UserDetailsUpdateRequestDto;
                state[typedKey] =
                    typedKey === 'englishLevel' &&
                    action.payload[typedKey] === null
                        ? ' '
                        : action.payload[typedKey];
            }
        });
        builder.addCase(getTalentDetails.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            for (const key in action.payload) {
                const typedKey = key as keyof UserDetailsFindRequestDto;

                state[typedKey] =
                    typedKey === 'englishLevel' &&
                    action.payload[typedKey] === null
                        ? ' '
                        : action.payload[typedKey];
            }
        });
        builder.addMatcher(
            isAnyOf(getTalentDetails.pending, updateTalentDetails.pending),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(getTalentDetails.rejected, updateTalentDetails.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
