import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    type ProfileStepDto,
    type UserDetailsResponseDto,
} from '~/bundles/talent/types/types';

import { completeProfileStep } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    stepData: {
        profileStepData1: ProfileStepDto | null;
        profileStepData2: ProfileStepDto | null;
    };
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    stepData: {
        profileStepData1: null,
        profileStepData2: null,
    },
};

const mapKeysToFields = (key: string): keyof State['stepData'] | undefined => {
    switch (key) {
        case 'keyFromUserDetails1': {
            return 'profileStepData1';
        }
        case 'keyFromUserDetails2': {
            return 'profileStepData2';
        }
        default: {
            return undefined;
        }
    }
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talents',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(completeProfileStep.fulfilled, (state, action) => {
            for (const key in action.payload) {
                const fieldName = mapKeysToFields(key);
                if (fieldName !== undefined) {
                    state.stepData[fieldName] =
                        action.payload[key as keyof UserDetailsResponseDto];
                }
            }
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(completeProfileStep.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(completeProfileStep.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
