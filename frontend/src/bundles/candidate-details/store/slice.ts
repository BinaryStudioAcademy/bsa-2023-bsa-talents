import { createSlice } from '@reduxjs/toolkit';

import { type MessageTemplateDto } from '../types/types.js';
import {
    addMessageTemplate,
    editMessageTemplate,
    removeMessageTemplate,
} from './actions.js';

type State = {
    messageTemplates: MessageTemplateDto[];
};

const initialState: State = {
    messageTemplates: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'candidate',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addMessageTemplate.fulfilled, (state, action) => {
            if (
                state.messageTemplates.some(
                    (template) => template.name === action.payload.name,
                )
            ) {
                return;
            }
            state.messageTemplates = [
                ...state.messageTemplates,
                action.payload,
            ];
        });

        builder.addCase(removeMessageTemplate.fulfilled, (state, action) => {
            state.messageTemplates = [...state.messageTemplates].filter(
                (template) => template.name !== action.payload,
            );
        });

        builder.addCase(editMessageTemplate.fulfilled, (state, action) => {
            const { newName, oldName } = action.payload;
            state.messageTemplates = state.messageTemplates.map((template) => {
                if (template.name === oldName) {
                    return { ...template, name: newName };
                }
                return template;
            });
        });
    },
});

export { actions, name, reducer };
