import { type Entity } from '~/common/types/types.js';

import { type ChatMessageProperties } from './types/types.js';

class ChatMessageEntity implements Entity {
    private 'id': string | null;
    private 'senderId': string;
    private 'receiverId': string;
    private 'chatId': string;
    private 'message': string;
    private 'isRead': boolean;
    private 'createdAt': string;

    private constructor({
        id,
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
        createdAt,
    }: ChatMessageProperties) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.chatId = chatId;
        this.message = message;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }

    public static initialize({
        id,
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
        createdAt,
    }: { id: string } & Omit<ChatMessageProperties, 'id'>): ChatMessageEntity {
        return new ChatMessageEntity({
            id,
            senderId,
            receiverId,
            chatId,
            message,
            isRead,
            createdAt,
        });
    }

    public static initializeNew({
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
        createdAt,
    }: Omit<ChatMessageProperties, 'id'>): ChatMessageEntity {
        return new ChatMessageEntity({
            id: null,
            senderId,
            receiverId,
            chatId,
            message,
            isRead,
            createdAt,
        });
    }

    public toObject(): { id: string } & Omit<ChatMessageProperties, 'id'> {
        return {
            id: this.id as string,
            senderId: this.senderId,
            receiverId: this.receiverId,
            chatId: this.chatId,
            message: this.message,
            isRead: this.isRead,
            createdAt: this.createdAt,
        };
    }

    public toNewObject(): Omit<ChatMessageProperties, 'id'> {
        return {
            senderId: this.senderId,
            receiverId: this.receiverId,
            chatId: this.chatId,
            message: this.message,
            isRead: this.isRead,
            createdAt: this.createdAt,
        };
    }
}

export { ChatMessageEntity };
