import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type NotificationType } from '~/services/notification/enums/notification-type.enum.js';

import { name as sliceName } from './slice.js';

type Notification = {
    type: keyof typeof NotificationType;
    message: string;
};

const notify = createAsyncThunk<unknown, Notification, AsyncThunkConfig>(
    `${sliceName}/notification`,
    (payload: Notification, { extra }) => {
        const { notification } = extra;

        notification[payload.type](payload.message);
    },
);

export { notify };
