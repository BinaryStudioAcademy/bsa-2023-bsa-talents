import joi from 'joi';

import { type ChatMessagesCreateRequestDto } from '../chat-messages.js';

const chatMessagesCreate = joi.object<ChatMessagesCreateRequestDto, true>({
    senderId: joi.string().trim().uuid().required(),
    receiverId: joi.string().trim().uuid().required(),
    chatId: joi.string().trim().uuid(),
    message: joi.string().trim().required(),
});

export { chatMessagesCreate };
