import { type Entity } from '~/common/types/types.js';

import { type UserDetailsModel } from '../user-details/user-details.model.js';
import { ChatEntity } from './chat.entity.js';
import { MessageEntity } from './message.entity.js';
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
        // TODO: remove before pr
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

    public toMessageEntity(): MessageEntity {
        return MessageEntity.initialize({
            id: this.id as string,

            senderId: this.senderId,
            receiverId: this.receiverId,
            chatId: this.chatId,

            message: this.message,
            isRead: this.isRead,
        });
    }

    public toChatEntity(): ChatEntity {
        return ChatEntity.initialize({
            chatId: this.chatId,

            // senderId: this.senderId, // TODO: remove
            // receiverId: this.receiverId,

            lastMessageCreatedAt: this.lastMessageCreatedAt as string,
            lastMessage: this.lastMessage as string,
            sender: this.sender as UserDetailsModel,
            receiver: this.receiver as UserDetailsModel,
        });
    }
}

export { ChatMessageEntity };
