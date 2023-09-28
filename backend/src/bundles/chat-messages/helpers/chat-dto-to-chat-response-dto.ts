import { type ChatItem, type ChatResponseDto } from '../types/types.js';

const chatDtoToChatResponseDto = (chat: ChatItem): ChatResponseDto => {
    const { chatId, lastMessageCreatedAt, lastMessage, sender, receiver } =
        chat;

    return {
        chatId,
        lastMessageCreatedAt,
        lastMessage,
        participants: {
            sender: {
                id: sender.userId,
                fullName: sender.fullName,
                profileName: sender.profileName,
                companyName: sender.companyName,
                avatarUrl: sender.photo ? sender.photo.url : '',
            },
            receiver: {
                id: receiver.userId,
                fullName: receiver.fullName,
                profileName: receiver.profileName,
                companyName: receiver.companyName,
                avatarUrl: receiver.photo ? receiver.photo.url : '',
            },
        },
    };
};

export { chatDtoToChatResponseDto };
