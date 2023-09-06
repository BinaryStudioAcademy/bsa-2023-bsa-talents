import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_PAYLOAD_PROFILE_STEP } from '../components/profile-step/constants/default.constants.js';
import { DEFAULT_PAYLOAD_SKILLS_STEP } from '../components/skills-step/constants/default.constants.js';
import { type ProfileStepDto, type SkillsStepDto } from '../types/types.js';
import { profileStep, skillsStep } from './actions.js';

type State = {
    profileStep: ProfileStepDto | null;
    skillsStep: SkillsStepDto | null;
};

const initialState: State = {
    profileStep: DEFAULT_PAYLOAD_PROFILE_STEP,
    skillsStep: DEFAULT_PAYLOAD_SKILLS_STEP,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talentOnBoarding',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(profileStep.fulfilled, (state, action) => {
            state.profileStep = action.payload;
        });
        builder.addCase(skillsStep.fulfilled, (state, action) => {
            const {
                hardSkills,
                englishLevel,
                notConsidered,
                preferredLanguages,
                projectLinks,
            } = action.payload;
            if (state.skillsStep) {
                state.skillsStep.hardSkills = hardSkills;
                state.skillsStep.englishLevel = englishLevel;
                state.skillsStep.notConsidered = notConsidered;
                state.skillsStep.preferredLanguages = preferredLanguages;
                state.skillsStep.projectLinks = projectLinks;
            }
        });
    },
});

export { actions, name, reducer };
