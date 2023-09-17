import { type UserDetailsModel } from '~/bundles/user-details/user-details.model.js';

type ChatMessageProperties = {
    id: string | null;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead: boolean;
    sender: UserDetailsModel;
};

export { type ChatMessageProperties };
