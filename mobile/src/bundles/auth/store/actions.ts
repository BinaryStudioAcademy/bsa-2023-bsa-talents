import { createAsyncThunk } from '@reduxjs/toolkit';

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
    try {
        const { authApi, storage } = extra;
        const response = await authApi.signIn(signInPayload);
        await storage.set(StorageKey.TOKEN, response.token);
        return response;
    } catch (error) {
        if (error instanceof Error) {
            // TODO: NOTIFY Error (ErrorMessages.UNKNOWN_ERROR);
            throw error;
        }
        // TODO: NOTIFY Error (ErrorMessages.UNKNOWN_ERROR);
        throw error;
    }
});

export { signIn, signUp };
