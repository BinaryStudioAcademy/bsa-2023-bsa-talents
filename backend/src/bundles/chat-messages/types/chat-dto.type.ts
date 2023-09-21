import { type UserDetailsModel } from '~/bundles/user-details/user-details.model.js';

type ChatDto = {
    chatId: string;
    lastMessageCreatedAt: string;
    lastMessage: string;
    sender: UserDetailsModel;
    receiver: UserDetailsModel;
};

export { type ChatDto };
