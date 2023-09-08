import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type UserDetailsGeneralCustom } from '../types/types.js';
import { name as sliceName } from './slice.js';

const updateTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(`${sliceName}/update-talent-details`, async (registerPayload, { extra }) => {
    const { talentOnBoardingApi } = extra;

    if ('badges' in registerPayload) {
        return registerPayload;
    }

    await talentOnBoardingApi.updateUserDetails({
        fullName: 'Nika',
        ...registerPayload,
    });

    return registerPayload;
});

const createTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(`${sliceName}/create-talent-details`, async (registerPayload, { extra }) => {
    const { talentOnBoardingApi } = extra;

    await talentOnBoardingApi.createUserDetails({
        ...registerPayload,
        fullName: 'Nika',
    });

    return registerPayload;
});

export { createTalentDetails, updateTalentDetails };
