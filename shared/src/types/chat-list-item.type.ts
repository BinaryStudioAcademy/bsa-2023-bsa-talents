import { type ChatParticipantDto } from '~/bundles/chat-messages/types/types.js';

type ChatListItemType = {
    chatId: string;
    userId: string;
    username: string;
    lastMessage?: string;
    lastMessageDate?: string;
    avatar?: string;
    isSelected?: boolean;
    sender?: ChatParticipantDto;
    receiver?: ChatParticipantDto;
};

export { type ChatListItemType };
