import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import { type UserDetailsResponseDto } from '~/bundles/employer/types/types';

import { name as sliceName } from './slice';

const getTalents = createAsyncThunk<
    UserDetailsResponseDto[],
    string | undefined,
    AsyncThunkConfig
>(`${sliceName}/getTalentsData`, async (payload, { extra }) => {
    const { employerApi, notifications } = extra;
    try {
        const users = await employerApi.getTalents(payload ?? '');
        return users.filter((user) => user.cvId);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

export { getTalents };
