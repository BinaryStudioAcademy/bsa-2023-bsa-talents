import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import { type UserDetailsResponseDto } from '~/bundles/employer/types/types';

import { name as sliceName } from './slice';

const getTalentsData = createAsyncThunk<
    UserDetailsResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/getTalentsData`, async (_, { extra }) => {
    const { employerApi, notifications } = extra;
    try {
        const users = await employerApi.getAllTalents();
        return users.filter((user) => user.cvId);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const getFilteredTalents = createAsyncThunk<
    UserDetailsResponseDto[],
    string,
    AsyncThunkConfig
>(`${sliceName}/getTalentsData`, async (payload, { extra }) => {
    const { employerApi, notifications } = extra;
    try {
        const users = await employerApi.getFilteredTalents(payload);
        return users.filter((user) => user.cvId);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

export { getFilteredTalents, getTalentsData };
