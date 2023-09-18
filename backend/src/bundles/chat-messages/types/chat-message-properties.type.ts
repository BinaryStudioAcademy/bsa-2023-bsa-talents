import { type UserDetailsModel } from '~/bundles/user-details/user-details.model.js';

type ChatMessageProperties = {
    id: string | null;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead: boolean;

    lastMessageCreatedAt?: string;
    lastMessage?: string;
    sender?: UserDetailsModel;
    receiver?: UserDetailsModel;
};

export { type ChatMessageProperties };
