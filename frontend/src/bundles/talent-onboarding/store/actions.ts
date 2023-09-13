import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type UserDetailsGeneralCustom } from '../types/types.js';
import { name as sliceName } from './slice.js';

const updateTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(`${sliceName}/update-talent-details`, async (registerPayload, { extra }) => {
    const { talentOnBoardingApi, fileUploadApi } = extra;
    const { cv, photo, ...restPayload } = registerPayload;
    let cvId: string, photoId: string;

    if (cv) {
        cvId = await fileUploadApi.uploadDocument({ cv });
        restPayload.cvId = cvId;
    }

    if (photo) {
        photoId = await fileUploadApi.uploadImage({ photo });
        restPayload.photoId = photoId;
    }

    if ('badges' in registerPayload) {
        return registerPayload;
    }

    const userDetails = await talentOnBoardingApi.getUserDetailsByUserId({
        userId: registerPayload.userId,
    });

    return await (userDetails
        ? talentOnBoardingApi.updateUserDetails(restPayload)
        : talentOnBoardingApi.createUserDetails(restPayload));
});

const getTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom | null,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(`${sliceName}/get-talent-details`, async (findPayload, { extra }) => {
    const { talentOnBoardingApi } = extra;

    return await talentOnBoardingApi.getUserDetailsByUserId({
        userId: findPayload.userId,
    });
});

export { getTalentDetails, updateTalentDetails };
