import { type ChatMessageModel } from '../chat-message.model.js';
import {
    type AdditionalChatProperties,
    type ChatItem,
} from '../types/types.js';

function chatMessageModelToChatDto(
    payload: ChatMessageModel & AdditionalChatProperties,
): ChatItem {
    const { chatId, lastMessageCreatedAt, lastMessage, sender, receiver } =
        payload as ChatItem;

    return {
        chatId,
        lastMessageCreatedAt,
        lastMessage,
        sender,
        receiver,
    };
}

export { chatMessageModelToChatDto };
