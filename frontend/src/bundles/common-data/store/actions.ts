import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiPath } from '~/bundles/common/enums/enums.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type BsaBadgesResponseDto,
    type HardSkillsResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const getHardSkillsData = createAsyncThunk<
    HardSkillsResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}${ApiPath.HARD_SKILLS}`, (_, { extra }) => {
    const { commonDataApi } = extra;

    return commonDataApi.getAllHardSkills();
});

const getBsaBadgesData = createAsyncThunk<
    BsaBadgesResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}${ApiPath.BSA_BADGES}`, (_, { extra }) => {
    const { commonDataApi } = extra;

    return commonDataApi.getAllBsaBadges();
});

export { getBsaBadgesData, getHardSkillsData };
