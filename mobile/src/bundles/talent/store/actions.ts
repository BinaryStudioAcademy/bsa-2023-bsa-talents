import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type UserDetailsCreateRequestDto,
    type UserDetailsFindRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/talent/types/types';

import { name as sliceName } from './slice';

const createTalentDetails = createAsyncThunk<
    UserDetailsResponseDto,
    UserDetailsCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/createTalentDetails`, async (onboardingPayload, { extra }) => {
    const { talentApi, notifications } = extra;
    try {
        return await talentApi.completeTalentDetails(onboardingPayload);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const updateOnboardingData = createAsyncThunk<
    UserDetailsUpdateDto,
    UserDetailsUpdateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/updateOnboardingData`, async (stepPayload, { extra }) => {
    const { talentApi, notifications } = extra;
    try {
        return await talentApi.completeOnboardingStep(stepPayload);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const setCompletedStep = createAction<number>(`${sliceName}/setCompletedStep`);

const getTalentDetails = createAsyncThunk<
    UserDetailsResponseDto | null,
    UserDetailsFindRequestDto,
    AsyncThunkConfig
>(`${sliceName}/getTalentDetails`, (detailsPayload, { extra }) => {
    const { talentApi, notifications } = extra;
    try {
        return talentApi.getTalentDetailsById(detailsPayload);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

export {
    createTalentDetails,
    getTalentDetails,
    setCompletedStep,
    updateOnboardingData,
};
