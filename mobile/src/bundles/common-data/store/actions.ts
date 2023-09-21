import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPath } from 'shared/build/index';

import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type BadgesResponseDto,
    type HardSkillsResponseDto,
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

export { getBadgesData, getHardSkillsData };
