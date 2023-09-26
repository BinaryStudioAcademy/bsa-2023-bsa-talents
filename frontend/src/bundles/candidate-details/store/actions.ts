import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type ContactsResponseDto,
    type MessageTemplateDto,
} from '../types/types.js';
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

type editTemplatePayload = { oldName: string; newName: string };

const editMessageTemplate = createAsyncThunk<
    editTemplatePayload,
    editTemplatePayload,
    AsyncThunkConfig
>(`${sliceName}/edit-message-template`, (templatePayload) => {
    return templatePayload;
});

const shareContactsWithCompany = createAsyncThunk<
    ContactsResponseDto | null,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/share-contacts`, async (_, { extra, getState }) => {
    const { candidateApi } = extra;
    const state = getState();
    try {
        return await candidateApi.shareContactWithCompany({
            companyId: state.chat.current.employerDetails.employerId ?? '',
            talentId: state.auth.currentUser?.id ?? '',
        });
    } catch {
        return null;
    }
});

const getContactWithTalent = createAsyncThunk<
    boolean,
    string,
    AsyncThunkConfig
>(
    `${sliceName}/get-contact-with-talent`,
    async (talentId, { extra, getState }) => {
        const { candidateApi } = extra;
        const state = getState();
        try {
            if (!talentId || !state.auth.currentUser?.id) {
                return false;
            }
            return await candidateApi.getContactWithTalent({
                companyId: state.auth.currentUser.id,
                talentId: talentId,
            });
        } catch {
            return false;
        }
    },
);

export {
    addMessageTemplate,
    editMessageTemplate,
    getContactWithTalent,
    removeMessageTemplate,
    shareContactsWithCompany,
};
