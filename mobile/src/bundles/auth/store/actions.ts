import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { AuthApiPath } from '~/bundles/auth/enums/enums';
import {
    type UserFindResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/auth/types/types';
import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { clearCommonStore } from '~/bundles/common/store/actions';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import { StorageKey } from '~/framework/storage/enums/enums';

import { name as sliceName } from './slice';

const clearAll = createAction(`${sliceName}/clearAll`);

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
        return await authApi.getCurrentUser();
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

const logout = createAsyncThunk<null, undefined, AsyncThunkConfig>(
    `${sliceName}/logout`,
    async (_, { extra, dispatch }) => {
        const { storage, notifications } = extra;
        try {
            dispatch(clearAll());
            dispatch(clearCommonStore());
            await storage.drop(StorageKey.TOKEN);
            return null;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
            throw error;
        }
    },
);

export { loadCurrentUser, logout, signIn, signUp };
