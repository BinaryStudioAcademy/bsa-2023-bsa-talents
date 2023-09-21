import { type ChatDto, type ChatResponseDto } from '../types/types.js';

function chatDtoToChatResponseDto(chat: ChatDto): ChatResponseDto {
    const { chatId, lastMessageCreatedAt, lastMessage, sender, receiver } =
        chat;

    const conversationPartner = chatId === sender.userId ? receiver : sender;

    // Get necessary fields from user details model
    const { userId: id, profileName, companyName, photo } = conversationPartner;

    // Get necessary fields from file model
    const avatarUrl = photo ? photo.url : null;

    return {
        chatId,
        lastMessageCreatedAt,
        lastMessage,
        partner: {
            id,
            profileName,
            companyName,
            avatarUrl,
        },
    };
}

export { chatDtoToChatResponseDto };
