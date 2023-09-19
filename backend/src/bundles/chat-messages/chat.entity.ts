import { type Entity } from '~/common/types/types.js';

import { type UserDetailsModel } from '../user-details/user-details.model.js';
import { type ChatProperties } from './types/types.js';

class ChatEntity implements Entity {
    private 'chatId': string;

    private 'senderId': string;
    private 'receiverId': string;

    public 'lastMessageCreatedAt': string;
    public 'lastMessage': string;
    public 'sender': UserDetailsModel;
    public 'receiver': UserDetailsModel;

    private constructor({
        chatId,
        lastMessageCreatedAt,
        lastMessage,
        sender,
        receiver,
    }: ChatProperties) {
        this.chatId = chatId;
        this.lastMessageCreatedAt = lastMessageCreatedAt;
        this.lastMessage = lastMessage;
        this.sender = sender;
        this.receiver = receiver;
    }

    public static initialize({
        chatId,
        lastMessageCreatedAt,
        lastMessage,
        sender,
        receiver,
    }: ChatProperties): ChatEntity {
        return new ChatEntity({
            chatId,
            lastMessageCreatedAt,
            lastMessage,
            sender,
            receiver,
        });
    }

    public toObject(): ChatProperties {
        return {
            chatId: this.chatId,
            lastMessageCreatedAt: this.lastMessageCreatedAt,
            lastMessage: this.lastMessage,
            sender: this.sender,
            receiver: this.receiver,
        };
    }

    public toNewObject(): ChatProperties {
        return {
            chatId: '',
            lastMessageCreatedAt: this.lastMessageCreatedAt,
            lastMessage: this.lastMessage,
            sender: this.sender,
            receiver: this.receiver,
        };
    }
}

export { ChatEntity };
