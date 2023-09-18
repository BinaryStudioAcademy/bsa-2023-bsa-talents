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

    public async findAllChatsByUserId(
        userId: string,
    ): Promise<ChatMessageEntity[]> {
        const chats = await this.chatMessageModel
            .query()
            .alias('cm')
            .select([
                'cm.chat_id',
                this.chatMessageModel
                    .raw('cm.created_at')
                    .as('last_message_created_at'),
                this.chatMessageModel.raw('cm.message').as('last_message'),
            ])
            .join(
                this.chatMessageModel
                    .query()
                    .select([
                        'chat_id',
                        this.chatMessageModel.fn
                            .max(
                                this.chatMessageModel.raw(
                                    'created_at::timestamp',
                                ),
                            )
                            .as('max_created_at'),
                    ])
                    .groupBy('chat_id')
                    .as('max_dates'),
                function () {
                    this.on('cm.chat_id', '=', 'max_dates.chat_id').andOn(
                        'cm.created_at',
                        '=',
                        'max_dates.max_created_at',
                    );
                },
            )
            .withGraphFetched({
                sender: { photo: true },
                receiver: { photo: true },
            })
            .where('senderId', userId)
            .orWhere('receiverId', userId);

        return chats.map((chat) => ChatMessageEntity.initialize(chat));
    }

    public async create(
        payload: ChatMessagesCreateRequestDto,
    ): Promise<ChatMessageEntity> {
        const newChatMessage = await this.chatMessageModel
            .query()
            .insertAndFetch({
                ...payload,
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
