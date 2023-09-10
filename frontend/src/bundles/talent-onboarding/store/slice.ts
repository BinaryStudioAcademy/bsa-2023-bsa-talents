import { createSlice } from '@reduxjs/toolkit';
import {
    type UserDetailsFindRequestDto,
    type UserDetailsUpdateRequestDto,
} from 'shared/build/index.js';

import { DEFAULT_PAYLOAD_BSA_BADGES_STEP } from '../components/badges-step/constants/constants.js';
import { DEFAULT_CONTACTS_CV_STEP_PAYLOAD } from '../components/contacts-cv-step/constants/constants.js';
import { DEFAULT_PAYLOAD_PROFILE_STEP } from '../components/profile-step/constants/default.constants.js';
import { DEFAULT_PAYLOAD_SKILLS_STEP } from '../components/skills-step/constants/default.constants.js';
import {
    NOT_NULLABLE_KEY_ARRAY,
    NOT_NULLABLE_KEY_STRING,
} from '../constants/constants.js';
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
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talentOnBoarding',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(updateTalentDetails.fulfilled, (state, action) => {
            for (const key in action.payload) {
                const typedKey = key as keyof UserDetailsUpdateRequestDto;
                if (
                    NOT_NULLABLE_KEY_ARRAY.has(typedKey) &&
                    action.payload[typedKey] === null
                ) {
                    state[typedKey] = [];
                } else if (
                    NOT_NULLABLE_KEY_STRING.has(typedKey) &&
                    action.payload[typedKey] === null
                ) {
                    state[typedKey] = '';
                } else {
                    state[typedKey] = action.payload[typedKey];
                }
            }
        });
        builder.addCase(getTalentDetails.fulfilled, (state, action) => {
            for (const key in action.payload) {
                const typedKey = key as keyof UserDetailsFindRequestDto;
                state[typedKey] = action.payload[typedKey];
            }
        });
    },
});

export { actions, name, reducer };
