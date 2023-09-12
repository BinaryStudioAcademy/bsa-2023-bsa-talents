import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    type BsaBadgesStepDto,
    type SkillsStepDto,
    type UserDetailsGeneralResponseDto,
} from '~/bundles/talent/types/types';

import {
    createTalentDetails,
    getTalentDetails,
    setCompletedStep,
    updateOnboardingData,
} from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    onboardingData: UserDetailsGeneralResponseDto | null;
    completedStep: string | null;
    badges: BsaBadgesStepDto | null;

    //TODO temporary
    skillsStepData: SkillsStepDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    onboardingData: null,
    completedStep: null,
    badges: null,

    //TODO temporary
    skillsStepData: null,
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
                [
                    createTalentDetails.fulfilled.type,
                    updateOnboardingData.fulfilled.type,
                    getTalentDetails.fulfilled.type,
                ].includes(action.type),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.onboardingData = {
                    ...state.onboardingData,
                    ...action.payload,
                };
                state.badges = action.payload.badges;
            },
        );
        builder.addMatcher(
            isAnyOf(
                createTalentDetails.pending,
                updateOnboardingData.pending,
                getTalentDetails.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                createTalentDetails.rejected,
                updateOnboardingData.rejected,
                getTalentDetails.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );

        // builder.addCase(completeSkillsStep.fulfilled, (state, action) => {
        //     const {
        //         hardSkills,
        //         englishLevel,
        //         notConsidered,
        //         preferredLanguages,
        //         projectLinks,
        //     } = action.payload;
        //     state.dataStatus = DataStatus.FULFILLED;
        //     state.skillsStepData = {
        //         hardSkills,
        //         englishLevel,
        //         notConsidered,
        //         preferredLanguages,
        //         projectLinks,
        //     };
        // });
        // builder.addMatcher(
        //     isAnyOf(completeSkillsStep.pending),
        //     (state) => {
        //         state.dataStatus = DataStatus.PENDING;
        //     },
        // );
        // builder.addMatcher(
        //     isAnyOf(completeSkillsStep.rejected),
        //     (state) => {
        //         state.dataStatus = DataStatus.REJECTED;
        //     },
        // );
    },
});

export { actions, name, reducer };
