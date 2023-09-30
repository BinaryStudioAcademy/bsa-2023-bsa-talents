import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiPath } from '~/bundles/common/enums/enums';
import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type BadgesResponseDto,
    type HardSkillsResponseDto,
    type LMSDataResponseDto,
    type UserFindResponseDto,
    type UserGetLMSDataById,
} from '~/bundles/common-data/types/types';

import { name as sliceName } from './slice';

const getHardSkillsData = createAsyncThunk<
    HardSkillsResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}${ApiPath.HARD_SKILLS}`, (_, { extra }) => {
    const { commonDataApi } = extra;

    return commonDataApi.getHardSkillsData();
});

const getBadgesData = createAsyncThunk<
    BadgesResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}${ApiPath.BSA_BADGES}`, (_, { extra }) => {
    const { commonDataApi } = extra;

    return commonDataApi.getBadgesData();
});

const loadAllPartners = createAsyncThunk<
    { items: UserFindResponseDto[] },
    undefined,
    AsyncThunkConfig
>(`${sliceName}${ApiPath.USERS}`, async (_, { extra }) => {
    const { commonDataApi, notifications } = extra;
    try {
        return await commonDataApi.getAllUsers();
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const loadLMSData = createAsyncThunk<
    LMSDataResponseDto,
    UserGetLMSDataById,
    AsyncThunkConfig
>(`${sliceName}${ApiPath.USERS}/LMS`, async (userId, { extra }) => {
    const { commonDataApi } = extra;

    return await commonDataApi.getDataFromLMS(userId);
});

export { getBadgesData, getHardSkillsData, loadAllPartners, loadLMSData };
