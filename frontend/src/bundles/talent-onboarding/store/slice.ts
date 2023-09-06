import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_CONTACTS_CV_STEP_PAYLOAD } from '../components/contacts-cv-step/constants/constants.js';
import { DEFAULT_PAYLOAD_PROFILE_STEP } from '../components/profile-step/constants/default.constants.js';
import { type ContactsCVStepDto, type ProfileStepDto } from '../types/types.js';
import { contactsCVStep, profileStep } from './actions.js';

type State = {
    profileStep: ProfileStepDto | null;
    contactsCVStep: ContactsCVStepDto | null;
};

const initialState: State = {
    profileStep: DEFAULT_PAYLOAD_PROFILE_STEP,
    contactsCVStep: DEFAULT_CONTACTS_CV_STEP_PAYLOAD,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talentOnBoarding',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(profileStep.fulfilled, (state, action) => {
            state.profileStep = action.payload;
        });
        builder.addCase(contactsCVStep.fulfilled, (state, action) => {
            const { fullName, phoneNumber, linkedInLink } = action.payload;
            if (state.contactsCVStep) {
                state.contactsCVStep.fullName = fullName;
                state.contactsCVStep.phoneNumber = phoneNumber;
                state.contactsCVStep.linkedInLink = linkedInLink;
            }
        });
    },
});

export { actions, name, reducer };
