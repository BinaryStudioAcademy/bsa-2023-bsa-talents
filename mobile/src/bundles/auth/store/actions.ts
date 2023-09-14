import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/auth/types/types';
import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import { StorageKey } from '~/framework/storage/enums/enums';

import { AuthApiPath } from '../enums/enums';
import { type UserFindResponseDto } from '../types/types';
import { name as sliceName } from './slice';

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}${AuthApiPath.SIGN_UP}`, async (signUpPayload, { extra }) => {
    const { authApi, storage, notifications } = extra;
    try {
        const response = await authApi.signUp(signUpPayload);
        await storage.set(StorageKey.TOKEN, response.token);
        return response;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const loadCurrentUser = createAsyncThunk<
    UserFindResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}${AuthApiPath.CURRENT_USER}`, async (_, { extra }) => {
    const { authApi, storage } = extra;
    try {
        return authApi.getCurrentUser();
    } catch (error) {
        await storage.drop(StorageKey.TOKEN);
        throw error;
    }
});

const signIn = createAsyncThunk<
    UserSignInResponseDto,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}${AuthApiPath.SIGN_IN}`, async (signInPayload, { extra }) => {
    const { authApi, storage, notifications } = extra;
    try {
        const response = await authApi.signIn(signInPayload);
        await storage.set(StorageKey.TOKEN, response.token);
        return response;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

export { loadCurrentUser, signIn, signUp };
