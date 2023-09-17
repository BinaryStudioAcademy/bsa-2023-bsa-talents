import { type UserDetailsResponseDto } from '~/index.js';

type ChatMessagesResponseDto = {
    id: string;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead: boolean;
    sender: UserDetailsResponseDto;
};

export { type ChatMessagesResponseDto };
