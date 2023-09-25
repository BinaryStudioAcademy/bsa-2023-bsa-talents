import { ErrorMessage } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/service.type.js';

import { type ChatMessagesRepository } from './chat-messages.repository.js';
import { chatDtoToChatResponseDto } from './helpers/chat-dto-to-chat-response-dto.js';
import {
    type ChatMessagesCreateRequestDto,
    type ChatResponseDto,
    type MessageResponseDto,
} from './types/types.js';

class ChatMessagesService implements Service {
    private chatMessagesRepository: ChatMessagesRepository;

    public constructor(chatMessagesRepository: ChatMessagesRepository) {
        this.chatMessagesRepository = chatMessagesRepository;
    }

    public find(): Promise<unknown | null> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async findAll(): Promise<{
        items: MessageResponseDto[];
    }> {
        const messages = await this.chatMessagesRepository.findAll();

        return {
            items: messages.map((message) => message.toObject()),
        };
    }

    public async findAllMessagesByChatId(chatId: string): Promise<{
        items: MessageResponseDto[];
    }> {
        const messages =
            await this.chatMessagesRepository.findAllMessagesByChatId(chatId);

        return {
            items: messages.map((message) => message.toObject()),
        };
    }

    public async findAllChatsByUserId(userId: string): Promise<{
        items: ChatResponseDto[];
    }> {
        const chats = await this.chatMessagesRepository.findAllChatsByUserId(
            userId,
        );

        const parsedChats = chats.map((chat) => chatDtoToChatResponseDto(chat));

        return {
            items: parsedChats,
        };
    }

    public async create(
        payload: ChatMessagesCreateRequestDto,
    ): Promise<MessageResponseDto> {
        const isFirstMessage = !payload.chatId;

        if (isFirstMessage) {
            const chats =
                await this.chatMessagesRepository.findAllChatsByUserId(
                    payload.senderId,
                );

            for (const chat of chats) {
                if (chat.receiver.userId === payload.receiverId) {
                    throw new HttpError({
                        message: 'You already have this conversation.',
                        status: HttpCode.CONFLICT,
                    });
                }
            }
        }

        const newMessage = await this.chatMessagesRepository.create(payload);

        return newMessage.toObject();
    }

    public async read(messageId: string): Promise<MessageResponseDto> {
        const patchedMessage = await this.chatMessagesRepository.patch({
            id: messageId,
            isRead: true,
        });
        return patchedMessage.toObject();
    }

    public update(): Promise<unknown> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { ChatMessagesService };
