import { type Entity } from '~/common/types/types.js';

import { type UserDetailsModel } from '../user-details/user-details.model.js';
import { type ChatMessageProperties } from './types/types.js';

class ChatMessageEntity implements Entity {
    private 'id': string | null;
    private 'senderId': string;
    private 'receiverId': string;
    private 'chatId': string;
    private 'message': string;
    private 'isRead': boolean;
    private 'sender': UserDetailsModel;

    private constructor({
        id,
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
        sender,
    }: ChatMessageProperties) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.chatId = chatId;
        this.message = message;
        this.isRead = isRead;
        this.sender = sender;
    }

    public static initialize({
        id,
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
        sender,
    }: { id: string } & Omit<ChatMessageProperties, 'id'>): ChatMessageEntity {
        return new ChatMessageEntity({
            id,
            senderId,
            receiverId,
            chatId,
            message,
            isRead,
            sender,
        });
    }

    public static initializeNew({
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
        sender,
    }: Omit<ChatMessageProperties, 'id'>): ChatMessageEntity {
        return new ChatMessageEntity({
            id: null,
            senderId,
            receiverId,
            chatId,
            message,
            isRead,
            sender,
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
            sender: this.sender,
        };
    }

    public toNewObject(): Omit<ChatMessageProperties, 'id'> {
        return {
            senderId: this.senderId,
            receiverId: this.receiverId,
            chatId: this.chatId,
            message: this.message,
            isRead: this.isRead,
            sender: this.sender,
        };
    }
}

export { ChatMessageEntity };
