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
    (registerPayload, { getState, extra }) => {
        const { talentOnBoardingApi } = extra;

        if ('badges' in registerPayload) {
            return registerPayload;
        }
        const { talentOnBoarding } = getState();

        return talentOnBoarding.completedStep
            ? talentOnBoardingApi.updateUserDetails(registerPayload)
            : talentOnBoardingApi.createUserDetails(registerPayload);
    },
);

const getTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom | null,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(`${sliceName}/get-talent-details`, (findPayload, { extra }) => {
    const { talentOnBoardingApi } = extra;

    return talentOnBoardingApi.getUserDetailsByUserId({
        userId: findPayload.userId,
    });
});

export { getTalentDetails, updateTalentDetails };
