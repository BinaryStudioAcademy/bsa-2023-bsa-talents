import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import {
    type AsyncThunkConfig,
    type UserDetailsGeneralCreateRequestDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsResponseDto,
} from '~/bundles/common/types/types';

import { name as sliceName } from './slice';

const createUserDetails = createAsyncThunk<
    UserDetailsResponseDto,
    UserDetailsGeneralCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/createUserDetails`, async (onboardingPayload, { extra }) => {
    const { commonApi, notifications, fileUploadApi } = extra;
    const { photo, companyLogo, ...payload } = onboardingPayload;

    if (photo) {
        try {
            const { image } = await fileUploadApi.upload({
                files: [photo],
            });
            payload.photoId = image.id;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
            throw error;
        }
    }
    if (companyLogo) {
        try {
            const { image } = await fileUploadApi.upload({
                files: [companyLogo],
            });
            payload.companyLogoId = image.id;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
            throw error;
        }
    }

    try {
        const response = await commonApi.completeUserDetails(payload);
        return {
            ...response,
            //TODO remove when it is ready at the backend
            ...(photo && { photo }),
            ...(companyLogo && { companyLogo }),
        };
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
    const { commonApi, notifications, fileUploadApi } = extra;
    const { badges, hardSkills, photo, cv, companyLogo, ...payload } =
        stepPayload;
    const talentHardSkills = hardSkills?.map((skill) => skill.value);

    if (photo) {
        try {
            const { image } = await fileUploadApi.upload({
                files: [photo],
            });
            payload.photoId = image.id;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
            throw error;
        }
    }
    if (companyLogo) {
        try {
            const { image } = await fileUploadApi.upload({
                files: [companyLogo],
            });
            payload.companyLogoId = image.id;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
            throw error;
        }
    }

    // if (cv) {
    //     try {
    //         const { document } = await fileUploadApi.upload({
    //             files: [cv],
    //         });
    //         payload.cvId = document.id;
    //     } catch (error) {
    //         const errorMessage = getErrorMessage(error);
    //         notifications.showError({ title: errorMessage });
    //         throw error;
    //     }
    // }

    if (Object.keys(payload).length === 0) {
        return stepPayload;
    }
    try {
        const response = await commonApi.completeOnboardingStep({
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
            ...(companyLogo && { companyLogo }),
        };
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const getUserDetails = createAsyncThunk<
    UserDetailsResponseDto | null,
    UserDetailsGeneralRequestDto,
    AsyncThunkConfig
>(`${sliceName}/getUserDetails`, async (payload, { extra }) => {
    const { notifications, commonApi } = extra;
    try {
        const userDetails = await commonApi.getUserDetailsByUserId({
            userId: payload.userId,
        });
        return userDetails ?? null;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const updatePublishedData = createAsyncThunk<
    UserDetailsGeneralRequestDto,
    UserDetailsGeneralRequestDto,
    AsyncThunkConfig
>(`${sliceName}/update-published-data`, (payload, { extra }) => {
    const { commonApi } = extra;
    return commonApi.updatePublishedData(payload);
});

const clearCommonStore = createAction(`${sliceName}/clearCommonStore`);

export {
    clearCommonStore,
    createUserDetails,
    getUserDetails,
    updateOnboardingData,
    updatePublishedData,
};
