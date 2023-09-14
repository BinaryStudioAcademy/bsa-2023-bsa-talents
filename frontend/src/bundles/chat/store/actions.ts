import { createAction } from '@reduxjs/toolkit';

import { type ChatMessageGetAllItemResponseDto } from '../types/types.js';

const addMessage = createAction(
    'chat/add-message',
    (message: ChatMessageGetAllItemResponseDto) => {
        return {
            payload: message,
        };
    },
);

export { addMessage };
