import { type Entity } from '~/common/types/types.js';

import { type ChatProperties } from './types/chat-properties.type.js';

class ChatEntity implements Entity {
    private 'id': string | null;
    public 'ownerId': string;
    public 'participantId': string;
    public 'name': string;

    private constructor({ id, ownerId, participantId, name }: ChatProperties) {
        this.id = id;
        this.ownerId = ownerId;
        this.participantId = participantId;
        this.name = name;
    }

    public static initialize({
        id,
        ownerId,
        participantId,
        name,
    }: { id: string } & Omit<ChatProperties, 'id'>): ChatEntity {
        return new ChatEntity({
            id,
            ownerId,
            participantId,
            name,
        });
    }

    public static initializeNew({
        ownerId,
        participantId,
        name,
    }: Omit<ChatProperties, 'id'>): ChatEntity {
        return new ChatEntity({
            id: null,
            ownerId,
            participantId,
            name,
        });
    }

    public toObject(): { id: string } & Omit<ChatProperties, 'id'> {
        return {
            id: this.id as string,
            ownerId: this.ownerId,
            participantId: this.participantId,
            name: this.name,
        };
    }

    public toNewObject(): Omit<ChatProperties, 'id'> {
        return {
            ownerId: this.ownerId,
            participantId: this.participantId,
            name: this.name,
        };
    }
}

export { ChatEntity };
