import joi from 'joi';

import { type ChatMessagesCreateRequestDto } from '../chat-messages.js';

const chatMessagesCreate = joi.object<ChatMessagesCreateRequestDto, true>({
    senderId: joi.string().trim().required(),
    receiverId: joi.string().trim().required(),
    chatId: joi.string().trim().required(),
    message: joi.string().trim().required(),
});

export { chatMessagesCreate };
