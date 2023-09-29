import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import {
    type AsyncThunkConfig,
    type UserDetailsGeneralCreateRequestDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsResponseDto,
} from '~/bundles/common/types/types';
import { type FileDto } from '~/bundles/file-upload/types/file-dto.type';

import { EMPTY_FILE_COUNT } from '../constants/constants';
import { mapFilesToPayload } from '../helpers/map-files-to-payload';
import { name as sliceName } from './slice';

const createUserDetails = createAsyncThunk<
    UserDetailsResponseDto,
    UserDetailsGeneralCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/createUserDetails`, async (onboardingPayload, { extra }) => {
    const { commonApi, notifications, fileUploadApi } = extra;
    const { photo, companyLogo, ...payload } = onboardingPayload;

    const files: FileDto[] = [];

    if (photo) {
        const [extension] = photo.name.split('.').reverse();
        files.push({
            extension,
            file: photo,
        });
    }

    if (files.length > EMPTY_FILE_COUNT) {
        const response = await fileUploadApi.upload({ files });
        mapFilesToPayload({
            payload: payload,
            files: response,
        });
    }

    if (companyLogo) {
        const [extension] = companyLogo.name.split('.').reverse();
        files.push({
            role: 'companyLogo',
            extension,
            file: companyLogo,
        });
        const { rn } = await fileUploadApi.upload({ files });
        payload.companyLogoId = rn.id;
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
    const {
        badges,
        hardSkills,
        photo,
        cv: cvDocument,
        companyLogo,
        ...payload
    } = stepPayload;
    const talentHardSkills = hardSkills?.map((skill) => skill.value);

    const files: FileDto[] = [];

    if (photo) {
        const [extension] = photo.name.split('.').reverse();
        files.push({
            extension,
            file: photo,
        });
    }

    if (cvDocument) {
        const [extension] = cvDocument.name.split('.').reverse();
        files.push({
            role: 'cvDocument',
            extension,
            file: cvDocument,
        });
    }

    if (files.length > EMPTY_FILE_COUNT) {
        const response = await fileUploadApi.upload({ files });
        mapFilesToPayload({
            payload: payload,
            files: response,
        });
    }

    if (companyLogo) {
        const [extension] = companyLogo.name.split('.').reverse();
        files.push({
            role: 'companyLogo',
            extension,
            file: companyLogo,
        });
        const { rn } = await fileUploadApi.upload({ files });
        payload.companyLogoId = rn?.id;
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

        if (userDetails?.companyLogoId) {
            const companyLogo = await fileUploadApi.getFileById({
                id: userDetails.companyLogoId,
            });
            return {
                ...userDetails,
                photoUrl: photo?.url,
                companyLogoUrl: companyLogo?.url,
            };
        } else {
            return {
                ...userDetails,
                photoUrl: photo?.url,
            };
        }
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
