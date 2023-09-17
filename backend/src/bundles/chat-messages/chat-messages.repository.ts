import { ErrorMessages } from 'shared/build/index.js';

import { type Repository } from '~/common/types/types.js';

import { ChatMessageEntity } from './chat-message.entity.js';
import { type ChatMessageModel } from './chat-message.model.js';
import {
    type ChatMessagesCreateRequestDto,
    type ChatMessagesPatchDto,
} from './types/types.js';

class ChatMessagesRepository implements Repository {
    private chatMessageModel: typeof ChatMessageModel;

    public constructor(chatMessageModel: typeof ChatMessageModel) {
        this.chatMessageModel = chatMessageModel;
    }

    public find(): Promise<ChatMessageEntity | null> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async findAll(): Promise<ChatMessageEntity[]> {
        const chatMessages = await this.chatMessageModel
            .query()
            .select('*')
            .withGraphFetched({
                sender: true,
            });

        return chatMessages.map((chatMessage) =>
            ChatMessageEntity.initialize(chatMessage),
        );
    }

    public async findAllByChatId(chatId: string): Promise<ChatMessageEntity[]> {
        const chatMessages = await this.chatMessageModel
            .query()
            .select('*')
            .where('chatId', chatId)
            .withGraphFetched({
                sender: true,
            });
        return chatMessages.map((chatMessage) =>
            ChatMessageEntity.initialize(chatMessage),
        );
    }

    public async create(
        payload: ChatMessagesCreateRequestDto,
    ): Promise<ChatMessageEntity> {
        const newChatMessage = await this.chatMessageModel
            .query()
            .insertAndFetch({
                ...payload,
            })
            .withGraphFetched({
                sender: true,
            });

        return ChatMessageEntity.initialize(newChatMessage);
    }

    public async patch(
        payload: ChatMessagesPatchDto,
    ): Promise<ChatMessageEntity> {
        const { id, ...rest } = payload;
        const patchedChatMessage = await this.chatMessageModel
            .query()
            .patchAndFetchById(id, { ...rest })
            .withGraphFetched({
                sender: true,
            });

        return ChatMessageEntity.initialize(patchedChatMessage);
    }

    public update(): Promise<ChatMessageEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { ChatMessagesRepository };
