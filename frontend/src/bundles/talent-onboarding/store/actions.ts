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

    const userDetails = await talentOnBoardingApi.getUserDetailsByUserId({
        userId: registerPayload.userId,
    });

    return await (userDetails
        ? talentOnBoardingApi.updateUserDetails(registerPayload)
        : talentOnBoardingApi.createUserDetails(registerPayload));
});

export { updateTalentDetails };
