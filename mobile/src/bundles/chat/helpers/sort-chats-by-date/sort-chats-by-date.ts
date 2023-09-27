import { type ChatResponseDto } from '~/bundles/chat/types/types';

const sortChatsByDate = (chats: ChatResponseDto[]): ChatResponseDto[] => {
    return [...chats].sort((a, b) => {
        const dateA = new Date(a.lastMessageCreatedAt).getTime();
        const dateB = new Date(b.lastMessageCreatedAt).getTime();
        return dateB - dateA;
    });
};

export { sortChatsByDate };
