import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { ApiPath } from '../enums/enums.js';
import { type BsaBadges, type HardSkills } from '../types/types.js';
import { name as sliceName } from './slice.js';

const getHardSkills = createAsyncThunk<HardSkills, undefined, AsyncThunkConfig>(
    `${sliceName}${ApiPath.HARD_SKILLS}`,
    async (_, { extra }) => {
        const { hardSkillsApi } = extra;

        return await hardSkillsApi.getAllHardSkills();
    },
);

const getBsaBadges = createAsyncThunk<BsaBadges, undefined, AsyncThunkConfig>(
    `${sliceName}${ApiPath.BSA_BADGES}`,
    async (_, { extra }) => {
        const { bsaBadgesApi } = extra;

        return await bsaBadgesApi.getAllBSABadges();
    },
);

export { getBsaBadges, getHardSkills };
