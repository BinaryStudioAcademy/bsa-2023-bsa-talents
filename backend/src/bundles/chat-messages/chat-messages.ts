import { logger } from '~/common/packages/packages.js';

import { ChatMessageModel } from './chat-message.model.js';
import { ChatMessagesController } from './chat-messages.controller.js';
import { ChatMessagesRepository } from './chat-messages.repository.js';
import { ChatMessagesService } from './chat-messages.service.js';

const chatMessagesRepository = new ChatMessagesRepository(ChatMessageModel);
const chatMessagesService = new ChatMessagesService(chatMessagesRepository);
const chatMessagesController = new ChatMessagesController(
    logger,
    chatMessagesService,
);

export { chatMessagesController };
export { ChatMessageModel } from './chat-message.model.js';
