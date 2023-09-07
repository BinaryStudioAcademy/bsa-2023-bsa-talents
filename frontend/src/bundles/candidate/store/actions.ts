import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type MessageTemplateDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const addMessageTemplate = createAsyncThunk<
    MessageTemplateDto,
    MessageTemplateDto,
    AsyncThunkConfig
>(`${sliceName}/add-message-template`, (templatePayload) => {
    return templatePayload;
});

const removeMessageTemplate = createAsyncThunk<
    MessageTemplateDto['name'],
    MessageTemplateDto['name'],
    AsyncThunkConfig
>(`${sliceName}/remove-message-template`, (templatePayload) => {
    return templatePayload;
});

export { addMessageTemplate, removeMessageTemplate };
