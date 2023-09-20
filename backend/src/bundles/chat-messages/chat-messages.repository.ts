import { ErrorMessages } from 'shared/build/index.js';

import { type Repository } from '~/common/types/types.js';

import { ChatMessageEntity } from './chat-message.entity.js';
import { type ChatMessageModel } from './chat-message.model.js';
import { chatMessageModelToChatDto } from './helpers/utils.js';
import {
    type ChatDto,
    type ChatMessagesCreateRequestDto,
    type ChatMessagesPatchDto,
} from './types/types.js';

class ChatMessagesRepository implements Repository {
    private chatMessageModel: typeof ChatMessageModel;

    public constructor(chatMessageModel: typeof ChatMessageModel) {
        this.chatMessageModel = chatMessageModel;
    }

    public find(): Promise<unknown | null> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async findAll(): Promise<ChatMessageEntity[]> {
        const chatMessages = await this.chatMessageModel.query().select('*');

        return chatMessages.map((chatMessage) =>
            ChatMessageEntity.initialize(chatMessage),
        );
    }

    public async findAllMessagesByChatId(
        chatId: string,
    ): Promise<ChatMessageEntity[]> {
        const chatMessages = await this.chatMessageModel
            .query()
            .select('*')
            .where('chatId', chatId);

        return chatMessages.map((chatMessage) =>
            ChatMessageEntity.initialize(chatMessage),
        );
    }

    public async findAllChatsByUserId(userId: string): Promise<ChatDto[]> {
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

        return chats.map((chat) => chatMessageModelToChatDto(chat));
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
            .patchAndFetchById(id, { ...rest });

        return ChatMessageEntity.initialize(patchedChatMessage);
    }

    public update(): Promise<unknown> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { ChatMessagesRepository };
