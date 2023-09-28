import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type TalentBadge } from 'shared/build/index.js';

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
    const { talentOnBoardingApi, fileUploadApi } = extra;
    const { cv, photo, ...restPayload } = updatePayload;

    if (cv && photo) {
        const { document, image } = await fileUploadApi.upload({
            files: [cv, photo],
        });

        restPayload.photoId = image.id;
        restPayload.cvId = document.id;
    }

    const { hardSkills, badges, ...data } = restPayload;
    const updatedData = {
        ...data,
        talentHardSkills: hardSkills?.map((item) => item.value),
        talentBadges: badges,
    };

    const result = await talentOnBoardingApi.updateUserDetails(updatedData);

    const talentBadgeObjects = result.talentBadges as TalentBadge[];

    const selectedBadges = talentBadgeObjects
        .filter((item) => item.isShown)
        .map((item) => item.id);

    return { ...result, badges: selectedBadges };
});

const saveTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/save-talent-details`,
    async (registerPayload, { dispatch, rejectWithValue }) => {
        try {
            const result = (await dispatch(
                updateTalentDetails(registerPayload),
            )) as PayloadAction<UserDetailsGeneralCustom>;

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

            if (userDetails?.talentBadges) {
                const talentBadgeObjects =
                    userDetails.talentBadges as TalentBadge[];
                userDetails.badges = talentBadgeObjects
                    .filter((item) => item.isShown)
                    .map((item) => item.id);
            }

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

export {
    createTalentDetails,
    getTalentDetails,
    saveTalentDetails,
    updateTalentDetails,
};
