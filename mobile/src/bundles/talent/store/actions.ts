import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type CvAndContactsFormDto,
    type UserDetailsCreateRequestDto,
    type UserDetailsFindRequestDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsGeneralResponseDto,
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
    UserDetailsGeneralResponseDto,
    UserDetailsGeneralRequestDto,
    AsyncThunkConfig
>(`${sliceName}/updateOnboardingData`, async (stepPayload, { extra }) => {
    const { talentApi, notifications } = extra;
    const { badges, hardSkills, photo, cv, ...payload } = stepPayload;

    if (Object.keys(payload).length === 0) {
        return stepPayload as UserDetailsGeneralResponseDto;
    }
    try {
        const response = await talentApi.completeOnboardingStep(payload);

        return {
            ...response,
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

const setCompletedStep = createAction<string>(`${sliceName}/setCompletedStep`);

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

//TODO temporary
const contactsCVStep = createAsyncThunk<
    CvAndContactsFormDto,
    CvAndContactsFormDto,
    AsyncThunkConfig
>(`${sliceName}/contacts-cv-step`, (contactsCVStepPayload) => {
    return contactsCVStepPayload;
});

export {
    contactsCVStep,
    createTalentDetails,
    getTalentDetails,
    setCompletedStep,
    updateOnboardingData,
};
