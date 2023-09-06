import { createSlice } from '@reduxjs/toolkit';
import { type UserDetailsUpdateRequestDto } from 'shared/build/index.js';

import { DEFAULT_CONTACTS_CV_STEP_PAYLOAD } from '../components/contacts-cv-step/constants/constants.js';
import { DEFAULT_PAYLOAD_PROFILE_STEP } from '../components/profile-step/constants/default.constants.js';
import { DEFAULT_PAYLOAD_SKILLS_STEP } from '../components/skills-step/constants/default.constants.js';
import { updateTalentDetails } from './actions.js';

type UserDetailsGeneralCustom = UserDetailsUpdateRequestDto & {
    hardSkills?: {
        value: string;
        label: string;
    }[];
    badges?: string[];
    photo?: File | null;
    cv?: File | null;
};

const initialState: UserDetailsGeneralCustom = {
    ...DEFAULT_PAYLOAD_PROFILE_STEP,
    ...DEFAULT_PAYLOAD_SKILLS_STEP,
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
                state[typedKey] = action.payload[typedKey];
            }
        });
    },
});

export { actions, name, reducer };
