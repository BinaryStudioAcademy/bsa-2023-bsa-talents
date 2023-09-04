import { createSlice } from '@reduxjs/toolkit';

import { type ContactsCVStepDto, type ProfileStepDto } from '../types/types.js';
import { contactsCVStep, profileStep } from './actions.js';

type State = {
    profileStep: ProfileStepDto | null;
    contactsCVStep: ContactsCVStepDto | null;
};

const initialState: State = {
    profileStep: null,
    contactsCVStep: null,
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
            state.contactsCVStep = action.payload;
        });
    },
});

export { actions, name, reducer };
