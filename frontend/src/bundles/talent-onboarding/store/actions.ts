import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type UserDetailsGeneralCustom } from '../types/types.js';
import { name as sliceName } from './slice.js';

const createTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(`${sliceName}/create-talent-details`, (registerPayload, { extra }) => {
    const { talentOnBoardingApi } = extra;

    return talentOnBoardingApi.createUserDetails(registerPayload);
});

const updateTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(`${sliceName}/update-talent-details`, async (updatePayload, { extra }) => {
    const { talentOnBoardingApi } = extra;
    if ('badges' in updatePayload) {
        return updatePayload;
    }
    const { hardSkills, ...otherOptions } = updatePayload;
    const sendUserData = {
        ...otherOptions,
        talentHardSkills: hardSkills?.map((item) => item.value),
    };
    return await talentOnBoardingApi.updateUserDetails(sendUserData);
});

const saveTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/save-talent-details`,
    async (registerPayload, { getState, dispatch, rejectWithValue }) => {
        const { talentOnBoarding } = getState();

        try {
            const result = talentOnBoarding.completedStep
                ? ((await dispatch(
                      updateTalentDetails(registerPayload),
                  )) as PayloadAction<UserDetailsGeneralCustom>)
                : ((await dispatch(
                      createTalentDetails(registerPayload),
                  )) as PayloadAction<UserDetailsGeneralCustom>);

            return result.payload;
        } catch {
            return rejectWithValue({
                _type: 'rejected',
                error: 'Bad request',
            });
        }
    },
);

const getTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom | null,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/get-talent-details`,
    async (findPayload, { extra, rejectWithValue }) => {
        const { talentOnBoardingApi } = extra;

        try {
            const userDetails =
                await talentOnBoardingApi.getUserDetailsByUserId({
                    userId: findPayload.userId,
                });

            return userDetails ?? null;
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            return null;
        }
    },
);

export { getTalentDetails, saveTalentDetails, updateTalentDetails };
