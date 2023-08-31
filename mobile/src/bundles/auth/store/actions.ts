import { createAsyncThunk } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users';

import { name as sliceName } from './slice';

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (signUpPayload, { extra }) => {
    const { authApi } = extra;
    try {
        return await authApi.signUp(signUpPayload);
    } catch (error) {
        if (error instanceof Error) {
            Toast.show({
                type: 'error',
                text1: error.message,
            });
            throw error;
        }
    }
});

export { signUp };
