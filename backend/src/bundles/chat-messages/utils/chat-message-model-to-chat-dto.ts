import { type ChatMessageModel } from '../chat-message.model.js';
import { type AdditionalChatProperties, type ChatDto } from '../types/types.js';

function chatMessageModelToChatDto(
    payload: ChatMessageModel & AdditionalChatProperties,
): ChatDto {
    const { chatId, lastMessageCreatedAt, lastMessage, sender, receiver } =
        payload as ChatDto;

    return {
        chatId,
        lastMessageCreatedAt,
        lastMessage,
        sender,
        receiver,
    };
}

export { chatMessageModelToChatDto };
