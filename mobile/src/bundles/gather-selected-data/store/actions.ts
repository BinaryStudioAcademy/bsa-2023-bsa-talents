import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type BadgesResponseDto,
    type HardSkillsResponseDto,
} from '~/bundles/gather-selected-data/types/types';

import { name as sliceName } from './slice';

const getHardSkillsData = createAsyncThunk<
    HardSkillsResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-skills`, (_, { extra }) => {
    const { gatherSelectedDataApi, notifications } = extra;
    try {
        return gatherSelectedDataApi.getHardSkillsData();
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const getBadgesData = createAsyncThunk<
    BadgesResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-badges`, (_, { extra }) => {
    const { gatherSelectedDataApi, notifications } = extra;
    try {
        return gatherSelectedDataApi.getBadgesData();
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

export { getBadgesData, getHardSkillsData };
