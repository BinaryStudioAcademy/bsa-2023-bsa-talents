import { createAsyncThunk } from '@reduxjs/toolkit';

import { ErrorMessages } from '~/bundles/common/enums/enums';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users';
import { StorageKey } from '~/framework/storage/enums/storage-key.enum';

import { name as sliceName } from './slice';

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (signUpPayload, { extra }) => {
    const { authApi } = extra;
    return authApi.signUp(signUpPayload);
});

const signIn = createAsyncThunk<
    UserSignInResponseDto,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
    const { authApi, storage, notifications } = extra;
    try {
        const response = await authApi.signIn(signInPayload);
        await storage.set(StorageKey.TOKEN, response.token);
        return response;
    } catch (error) {
        if (error instanceof Error) {
            notifications.showError(error.message);
            throw error;
        }
        notifications.showError(ErrorMessages.UNKNOWN_ERROR);
        throw error;
    }
});

export { signIn, signUp };
