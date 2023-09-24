import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type UserDetailsCreateRequestDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsResponseDto,
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
    UserDetailsGeneralRequestDto,
    UserDetailsGeneralRequestDto,
    AsyncThunkConfig
>(`${sliceName}/updateOnboardingData`, async (stepPayload, { extra }) => {
    const { talentApi, notifications } = extra;
    const { badges, hardSkills, photo, cv, ...payload } = stepPayload;
    const talentHardSkills = hardSkills?.map((skill) => skill.value);

    if (Object.keys(payload).length === 0) {
        return stepPayload;
    }
    try {
        const response = await talentApi.completeOnboardingStep({
            ...payload,
            talentHardSkills: talentHardSkills,
        });
        return {
            ...response,
            //TODO remove when it is ready at the backend
            ...(hardSkills && { hardSkills }),
            ...(badges && { badges }),
            ...(photo && { photo }),
            ...(cv && { cv }),
        };
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const getUserDetails = createAsyncThunk<
    UserDetailsGeneralRequestDto | null,
    UserDetailsGeneralRequestDto,
    AsyncThunkConfig
>(`${sliceName}/getUserDetails`, async (payload, { extra }) => {
    const { notifications, talentApi } = extra;
    try {
        const userDetails = await talentApi.getUserDetailsByUserId({
            userId: payload.userId,
        });
        return userDetails ?? null;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const clearTalentStore = createAction(`${sliceName}/clearTalentStore`);

export {
    clearTalentStore,
    createTalentDetails,
    getUserDetails,
    updateOnboardingData,
};
