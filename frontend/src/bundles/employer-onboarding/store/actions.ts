import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type FileDto } from '~/bundles/file-upload/types/file-dto.type.js';
import { EMPTY_FILE_COUNT } from '~/bundles/talent-onboarding/constants/constants.js';

import { mapFilesToPayload } from '../helpers/map-files-to-payload.js';
import { type UserDetailsGeneralCustom } from '../types/types.js';
import { name as sliceName } from './slice.js';

const createEmployerDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/create-employer`,
    (registerPayload, { extra, rejectWithValue }) => {
        const { employerOnBoardingApi } = extra;
        try {
            return employerOnBoardingApi.createUserDetails(registerPayload);
        } catch {
            return rejectWithValue({
                _type: 'rejected',
                error: 'Bad request',
            });
        }
    },
);

const updateEmployerDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/update-employer`,
    (registerPayload, { extra, rejectWithValue }) => {
        const { employerOnBoardingApi } = extra;

        try {
            return employerOnBoardingApi.updateUserDetails(registerPayload);
        } catch {
            return rejectWithValue({
                _type: 'rejected',
                error: 'Bad request',
            });
        }
    },
);

const saveEmployerDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/save-employer-details`,
    async (registerPayload, { dispatch, rejectWithValue, extra }) => {
        const { fileUploadApi } = extra;

        try {
            const { photo, companyLogo, ...restPayload } = registerPayload;
            delete restPayload.photoUrl;
            delete restPayload.companyLogoUrl;
            const files: FileDto[] = [];

            if (photo) {
                const [extension] = photo.name.split('.').reverse();
                files.push({
                    role: 'employerPhoto',
                    extension,
                    file: photo,
                });
            }

            if (companyLogo) {
                const [extension] = companyLogo.name.split('.').reverse();
                files.push({
                    role: 'companyLogo',
                    extension,
                    file: companyLogo,
                });
            }

            if (files.length > EMPTY_FILE_COUNT) {
                const response = await fileUploadApi.upload({ files });
                mapFilesToPayload({
                    payload: restPayload,
                    files: response,
                });
            }

            const userDetails = (await dispatch(
                getEmployerDetails(restPayload),
            )) as unknown as PayloadAction<UserDetailsGeneralCustom | null>;
            const result = userDetails.payload
                ? ((await dispatch(
                      updateEmployerDetails(restPayload),
                  )) as PayloadAction<UserDetailsGeneralCustom>)
                : ((await dispatch(
                      createEmployerDetails(restPayload),
                  )) as PayloadAction<UserDetailsGeneralCustom>);

            return result.payload;
        } catch (error) {
            return rejectWithValue({
                _type: 'rejected',
                error,
            });
        }
    },
);

const getEmployerDetails = createAsyncThunk<
    UserDetailsGeneralCustom | null,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/get-employer-details`,
    async (findPayload, { extra, rejectWithValue }) => {
        const { employerOnBoardingApi, fileUploadApi } = extra;

        try {
            const userDetails =
                await employerOnBoardingApi.getUserDetailsByUserId({
                    userId: findPayload.userId,
                });
            if (!userDetails) {
                return null;
            }
            const photo = await fileUploadApi.getFileById({
                id: userDetails.photoId ?? '',
            });
            const companyLogo = await fileUploadApi.getFileById({
                id: userDetails.companyLogoId ?? '',
            });
            return {
                ...userDetails,
                photoUrl: photo?.url,
                companyLogoUrl: companyLogo?.url,
            };
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            return null;
        }
    },
);

export {
    createEmployerDetails,
    getEmployerDetails,
    saveEmployerDetails,
    updateEmployerDetails,
};
