import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';

import { DEFAULT_PAYLOAD_BSA_BADGES_STEP } from '../components/badges-step/constants/constants.js';
import { DEFAULT_CONTACTS_CV_STEP_PAYLOAD } from '../components/contacts-cv-step/constants/constants.js';
import { DEFAULT_PAYLOAD_PROFILE_STEP } from '../components/profile-step/constants/default.constants.js';
import { DEFAULT_PAYLOAD_SKILLS_STEP } from '../components/skills-step/constants/default.constants.js';
import { fromUrlLinks } from '../helpers/helpers.js';
import { type UserDetailsGeneralCustom } from '../types/types.js';
import {
    getTalentDetails,
    saveTalentDetails,
    updateTalentDetails,
    updateTalentPublishedDate,
} from './actions.js';

const initialState: UserDetailsGeneralCustom = {
    ...DEFAULT_PAYLOAD_PROFILE_STEP,
    ...DEFAULT_PAYLOAD_BSA_BADGES_STEP,
    isApproved: false,
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
                const typedKey = key as keyof UserDetailsGeneralCustom;

                if (typedKey in state) {
                    state[typedKey] = action.payload[typedKey];
                }
            }
        });
        builder.addCase(getTalentDetails.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            for (const key in action.payload) {
                const typedKey = key as keyof UserDetailsGeneralCustom;
                state[typedKey] = action.payload[typedKey];
            }
        });
        builder.addCase(saveTalentDetails.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            for (const key in action.payload) {
                const typedKey = key as keyof UserDetailsGeneralCustom;
                state[typedKey] = action.payload[typedKey];
            }
        });
        builder.addCase(
            updateTalentPublishedDate.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                for (const key in action.payload) {
                    const typedKey = key as keyof UserDetailsUpdateRequestDto;
                    state[typedKey] = action.payload[typedKey];
                }
            },
        );
        builder.addMatcher(
            isAnyOf(
                getTalentDetails.pending,
                updateTalentDetails.pending,
                saveTalentDetails.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                updateTalentDetails.rejected,
                saveTalentDetails.rejected,
                getTalentDetails.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
