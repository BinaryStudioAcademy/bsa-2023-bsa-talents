import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type UserDetailsGeneralCustom } from '../types/types.js';
import { name as sliceName } from './slice.js';

const updateTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/update-talent-details`,
    async (registerPayload, { getState, extra }) => {
        const { talentOnBoardingApi } = extra;

        if ('badges' in registerPayload) {
            return registerPayload;
        }
        const { talentOnBoarding } = getState();

        return await (talentOnBoarding.currentStep
            ? talentOnBoardingApi.updateUserDetails(registerPayload)
            : talentOnBoardingApi.createUserDetails(registerPayload));
    },
);

const getTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom | null,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(`${sliceName}/get-talent-details`, async (findPayload, { extra }) => {
    const { talentOnBoardingApi } = extra;

    return await talentOnBoardingApi.getUserDetailsByUserId({
        userId: findPayload.userId,
    });
});

export { getTalentDetails, updateTalentDetails };
