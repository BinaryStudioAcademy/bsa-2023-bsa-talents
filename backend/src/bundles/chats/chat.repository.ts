import { ErrorMessages } from 'shared/build/index.js';

import { type Repository } from '~/common/types/types.js';

import { ChatEntity } from './chat.entity.js';
import { type ChatModel } from './chat.model.js';

class ChatRepository implements Repository {
    private chatModel: typeof ChatModel;

    public constructor(chatModel: typeof ChatModel) {
        this.chatModel = chatModel;
    }

    public async find(id: string): Promise<ChatEntity | null> {
        const chat = await this.chatModel
            .query()
            .findById(id)
            .withGraphFetched({ messages: true });

        return chat ? ChatEntity.initialize(chat) : null;
    }

    public async findAllByUserId(userId: string): Promise<ChatEntity[]> {
        const chats = await this.chatModel
            .query()
            .where('ownerId', userId)
            .orWhere('participantId', userId)
            .select('*');

        return chats.map((chat) => ChatEntity.initialize(chat));
    }

    public findAll(): ReturnType<Repository['findAll']> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(payload: {
        ownerId: string;
        participantId: string;
        name: string;
    }): Promise<ChatEntity> {
        const newChat = await this.chatModel.query().insertAndFetch({
            ...payload,
        });

        return ChatEntity.initialize(newChat);
    }

    public update(): Promise<ChatEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { ChatRepository };
