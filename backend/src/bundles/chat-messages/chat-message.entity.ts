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

    public 'lastMessageCreatedAt'?: string;
    public 'lastMessage'?: string;
    public 'sender'?: UserDetailsModel;
    public 'receiver'?: UserDetailsModel;

    private constructor({
        id,
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
        lastMessageCreatedAt,
        lastMessage,
        sender,
        receiver,
    }: ChatMessageProperties) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.chatId = chatId;
        this.message = message;
        this.isRead = isRead;
        this.lastMessageCreatedAt = lastMessageCreatedAt;
        this.lastMessage = lastMessage;
        this.sender = sender;
        this.receiver = receiver;
    }

    public static initialize({
        id,
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
        lastMessageCreatedAt,
        lastMessage,
        sender,
        receiver,
    }: { id: string } & Omit<ChatMessageProperties, 'id'>): ChatMessageEntity {
        return new ChatMessageEntity({
            id,
            senderId,
            receiverId,
            chatId,
            message,
            isRead,
            lastMessageCreatedAt,
            lastMessage,
            sender,
            receiver,
        });
    }

    public static initializeNew({
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
        lastMessageCreatedAt,
        lastMessage,
        sender,
        receiver,
    }: Omit<ChatMessageProperties, 'id'>): ChatMessageEntity {
        return new ChatMessageEntity({
            id: null,
            senderId,
            receiverId,
            chatId,
            message,
            isRead,
            lastMessageCreatedAt,
            lastMessage,
            sender,
            receiver,
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
            lastMessageCreatedAt: this.lastMessageCreatedAt,
            lastMessage: this.lastMessage,
            sender: this.sender,
            receiver: this.receiver,
        };
    }

    public toNewObject(): Omit<ChatMessageProperties, 'id'> {
        return {
            senderId: this.senderId,
            receiverId: this.receiverId,
            chatId: this.chatId,
            message: this.message,
            isRead: this.isRead,
            lastMessageCreatedAt: this.lastMessageCreatedAt,
            lastMessage: this.lastMessage,
            sender: this.sender,
            receiver: this.receiver,
        };
    }
}

export { ChatMessageEntity };
