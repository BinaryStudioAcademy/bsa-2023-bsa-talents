import { type UserDetailsModel } from '~/bundles/user-details/user-details.model.js';

type AdditionalChatProperties = {
    lastMessageCreatedAt?: string;
    lastMessage?: string;
    sender?: UserDetailsModel;
    receiver?: UserDetailsModel;
};

export { type AdditionalChatProperties };
