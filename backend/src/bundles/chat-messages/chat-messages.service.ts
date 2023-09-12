import { ErrorMessages } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/service.type.js';

import { type ChatMessagesRepository } from './chat-messages.repository.js';
import { type ChatMessageProperties } from './types/chat-message-properties.type.js';
import { type ChatMessagesCreateRequestDto } from './types/types.js';

class ChatMessagesService implements Service {
    private chatMessagesRepository: ChatMessagesRepository;

    public constructor(chatMessagesRepository: ChatMessagesRepository) {
        this.chatMessagesRepository = chatMessagesRepository;
    }

    public find(): Promise<string | null> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async findAll(): Promise<{
        items: ChatMessageProperties[];
    }> {
        const chatMessages = await this.chatMessagesRepository.findAll();

        return {
            items: chatMessages.map((chatMessage) => chatMessage.toObject()),
        };
    }

    public async findAllByChatId(chatId: string): Promise<{
        items: ChatMessageProperties[];
    }> {
        const chatMessages = await this.chatMessagesRepository.findAllByChatId(
            chatId,
        );

        return {
            items: chatMessages.map((chatMessage) => chatMessage.toObject()),
        };
    }

    public async create(
        payload: ChatMessagesCreateRequestDto,
    ): Promise<ChatMessageProperties> {
        const newChatMessage = await this.chatMessagesRepository.create(
            payload,
        );
        return newChatMessage.toObject();
    }

    public async read(messageId: string): Promise<ChatMessageProperties> {
        const patchedChatMessage = await this.chatMessagesRepository.patch({
            id: messageId,
            isRead: true,
        });
        return patchedChatMessage.toObject();
    }

    public update(): Promise<unknown> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { ChatMessagesService };
