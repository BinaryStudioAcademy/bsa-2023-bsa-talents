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
            const { rn } = await fileUploadApi.upload({
                files: [photo],
            });
            payload.photoId = rn.id;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
            throw error;
        }
    }

    if (companyLogo) {
        try {
            const { rn } = await fileUploadApi.upload({
                files: [companyLogo],
            });
            payload.companyLogoId = rn.id;
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

    const cvDocument = cv;

    if (photo) {
        try {
            const { rn } = await fileUploadApi.upload({
                files: [photo],
            });
            payload.photoId = rn.id;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
            throw error;
        }
    }

    if (companyLogo) {
        try {
            const { rn } = await fileUploadApi.upload({
                files: [companyLogo],
            });
            payload.companyLogoId = rn.id;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
            throw error;
        }
    }

    if (cvDocument) {
        try {
            const { cv } = await fileUploadApi.upload({
                files: [cvDocument],
            });
            payload.cvId = cv?.id;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
            throw error;
        }
    }

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
    const { notifications, commonApi, fileUploadApi } = extra;
    try {
        const userDetails = await commonApi.getUserDetailsByUserId({
            userId: payload.userId,
        });

        const photo = await fileUploadApi.getFileById({
            id: userDetails?.photoId ?? '',
        });
        const companyLogo = await fileUploadApi.getFileById({
            id: userDetails?.companyLogoId ?? '',
        });

        return {
            ...userDetails,
            photoUrl: photo?.url,
            companyLogoUrl: companyLogo?.url,
        };
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
