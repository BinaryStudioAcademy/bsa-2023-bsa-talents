import { type UserDetailsModel } from '~/bundles/user-details/user-details.model.js';

import { type ChatMessageModel } from '../chat-message.model.js';
import { type ChatProperties } from '../types/chat-properties.type.js';

class Chat {
    private 'chatId': string;

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
    }: ChatMessageModel & {
        lastMessageCreatedAt?: string;
        lastMessage?: string;
        sender?: UserDetailsModel;
        receiver?: UserDetailsModel;
    }): Chat {
        return new Chat({
            chatId,
            lastMessageCreatedAt: lastMessageCreatedAt as string,
            lastMessage: lastMessage as string,
            sender: sender as UserDetailsModel,
            receiver: receiver as UserDetailsModel,
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
}

export { Chat };
