import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    type BadgesResponseDto,
    type FormattedHardSkills,
    type LMSDataResponseDto,
    type UserFindResponseDto,
} from '~/bundles/common-data/types/types';

import {
    getBadgesData,
    getHardSkillsData,
    loadAllPartners,
    loadLMSData,
} from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    badgesData: BadgesResponseDto | null;
    hardSkillsData: FormattedHardSkills | null;
    lmsData: LMSDataResponseDto | null;
    partners: UserFindResponseDto[] | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    badgesData: null,
    hardSkillsData: null,
    lmsData: null,
    partners: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'common-data',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAllPartners.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.partners = null;
        });
        builder.addCase(loadLMSData.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.lmsData = null;
        });
        builder.addCase(loadLMSData.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.lmsData = payload;
        });
        builder.addCase(loadLMSData.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.lmsData = null;
        });
        builder.addCase(loadAllPartners.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.partners = payload.items.filter(
                (partner) => partner.role === 'talent',
            );
        });
        builder.addCase(loadAllPartners.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.partners = null;
        });
        builder.addCase(getBadgesData.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.badgesData = null;
        });
        builder.addCase(getBadgesData.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.badgesData = payload;
        });
        builder.addCase(getBadgesData.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.badgesData = null;
        });
        builder.addCase(getHardSkillsData.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.hardSkillsData = null;
        });
        builder.addCase(getHardSkillsData.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            const formattedData = payload.items.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            state.hardSkillsData = { items: formattedData };
        });
        builder.addCase(getHardSkillsData.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.hardSkillsData = null;
        });
    },
});

export { actions, name, reducer };
