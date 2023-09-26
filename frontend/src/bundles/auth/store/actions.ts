import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserFindResponseDto,
    type UserForgotPasswordRequestDto,
    type UserForgotPasswordResponseDto,
    type UserResetPasswordRequestDto,
    type UserResetPasswordResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { AuthApiPath } from '../enums/enums.js';
import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}${AuthApiPath.SIGN_UP}`, async (registerPayload, { extra }) => {
    const { authApi, storage } = extra;

    const data = await authApi.signUp(registerPayload);
    void storage.set(StorageKey.TOKEN, data.token);
    return data;
});

const signOut = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
    `${sliceName}/sign-out`,
    (_, { extra }) => {
        const { storage } = extra;

        void storage.drop(StorageKey.TOKEN);
    },
);

const loadUser = createAsyncThunk<
    UserFindResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}${AuthApiPath.CURRENT_USER}`, (_, { extra }) => {
    const { authApi } = extra;
    return authApi.getByToken();
});

const signIn = createAsyncThunk<
    UserSignInResponseDto,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}${AuthApiPath.SIGN_IN}`, async (loginPayload, { extra }) => {
    const { authApi, storage } = extra;
    const data = await authApi.signIn(loginPayload);
    void storage.set(StorageKey.TOKEN, data.token);

    return data;
});

const forgotPassword = createAsyncThunk<
    UserForgotPasswordResponseDto,
    UserForgotPasswordRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}${AuthApiPath.FORGOT_PASSWORD}`,
    async (forgotPasswordPayload, { extra }) => {
        const { authApi } = extra;
        const result = await authApi.forgotPassword(forgotPasswordPayload);
        toast(result.message);
        return result;
    },
);

const resetPassword = createAsyncThunk<
    UserResetPasswordResponseDto,
    UserResetPasswordRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}${AuthApiPath.FORGOT_PASSWORD}`,
    async (resetPasswordPayload, { extra }) => {
        const { authApi } = extra;
        const result = await authApi.resetPassword(resetPasswordPayload);
        toast(result.message);
        return result;
    },
);

export { forgotPassword, loadUser, resetPassword, signIn, signOut, signUp };
