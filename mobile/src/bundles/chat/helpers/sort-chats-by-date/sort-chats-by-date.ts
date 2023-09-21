import { type ChatItem } from '~/bundles/chat/types/types';

const sortChatsByDate = (chats: ChatItem[]): ChatItem[] => {
    return [...chats].sort((a, b) => {
        const dateA = new Date(a.lastMessageDate ?? '').getTime();
        const dateB = new Date(b.lastMessageDate ?? '').getTime();
        return dateB - dateA;
    });
};

export { sortChatsByDate };
