import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    type BadgeStepDto,
    type ProfileStepDto,
} from '~/bundles/talent/types/types';

import { completeBadgesStep, completeProfileStep } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    profileStepData: ProfileStepDto | null;
    badgesStepData: BadgeStepDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    badgesStepData: null,
    profileStepData: null,
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
                employmentTypes,
                experienceYears,
                jobTitle,
                location,
                description,
            } = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
            state.profileStepData = {
                profileName,
                salaryExpectation,
                employmentTypes,
                experienceYears,
                jobTitle,
                location,
                description,
            };
        });
        builder.addCase(completeBadgesStep.fulfilled, (state, action) => {
            state.badgesStepData = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(
            isAnyOf(completeProfileStep.pending, completeBadgesStep.pending),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(completeProfileStep.rejected, completeBadgesStep.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
