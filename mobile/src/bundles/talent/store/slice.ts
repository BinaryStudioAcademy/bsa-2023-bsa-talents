import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    type ProfileStepDto,
    type SkillsStepDto,
} from '~/bundles/talent/types/types';

import { completeProfileStep, completeSkillsStep } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    profileStepData: ProfileStepDto | null;
    skillsStepData: SkillsStepDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    profileStepData: null,
    skillsStepData: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talents',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(completeProfileStep.fulfilled, (state, action) => {
            const {
                profileName,
                salaryExpectation,
                employmentType,
                experienceYears,
                jobTitle,
                location,
                description,
            } = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
            state.profileStepData = {
                profileName,
                salaryExpectation,
                employmentType,
                experienceYears,
                jobTitle,
                location,
                description,
            };
        });
        builder.addCase(completeProfileStep.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(completeProfileStep.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(completeSkillsStep.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(completeSkillsStep.fulfilled, (state, action) => {
            const {
                hardSkills,
                englishLevel,
                notConsidered,
                preferredLanguages,
                projectLinks,
            } = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
            state.skillsStepData = {
                hardSkills,
                englishLevel,
                notConsidered,
                preferredLanguages,
                projectLinks,
            };
        });
        builder.addCase(completeSkillsStep.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
