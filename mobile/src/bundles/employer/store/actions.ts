import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import { type UserDetailsResponseDto } from '~/bundles/talent/types/types';

import { name as sliceName } from './slice';

const getTalentsData = createAsyncThunk<
    UserDetailsResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/getTalentsData`, async (_, { extra }) => {
    const { employerApi, notifications } = extra;
    try {
        const talentsData = await employerApi.getAllTalents();
        return talentsData.filter(({ isApproved }) => isApproved);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

export { getTalentsData };
