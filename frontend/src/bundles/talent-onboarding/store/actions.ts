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
>(`${sliceName}/update-talent-details`, (updatePayload, { extra }) => {
    const { talentOnBoardingApi } = extra;

    //TODO: remove this lines of code when task 'connect badges & hard skills saving for user details' will be done
    if ('badges' in updatePayload) {
        return updatePayload;
    }

    return talentOnBoardingApi.updateUserDetails(updatePayload);
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
>(`${sliceName}/get-talent-details`, (findPayload, { extra }) => {
    const { talentOnBoardingApi } = extra;

    return talentOnBoardingApi.getUserDetailsByUserId({
        userId: findPayload.userId,
    });
});

export { getTalentDetails, saveTalentDetails, updateTalentDetails };
