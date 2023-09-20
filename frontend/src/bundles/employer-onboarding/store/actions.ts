import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

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
    async (registerPayload, { dispatch, rejectWithValue }) => {
        try {
            const userDetails = (await dispatch(
                getEmployerDetails(registerPayload),
            )) as unknown as PayloadAction<UserDetailsGeneralCustom | null>;
            const result = userDetails.payload
                ? ((await dispatch(
                      updateEmployerDetails(registerPayload),
                  )) as PayloadAction<UserDetailsGeneralCustom>)
                : ((await dispatch(
                      createEmployerDetails(registerPayload),
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
        const { employerOnBoardingApi } = extra;

        try {
            const userDetails =
                await employerOnBoardingApi.getUserDetailsByUserId({
                    userId: findPayload.userId,
                });

            return userDetails ?? null;
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
