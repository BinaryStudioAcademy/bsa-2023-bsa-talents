import { type ChatParticipantDto } from './chat-participant-dto.type.js';

type ChatResponseDto = {
    chatId: string;
    lastMessageCreatedAt: string;
    lastMessage: string;
    participants: {
        sender: ChatParticipantDto;
        receiver: ChatParticipantDto;
    };
};

export { type ChatResponseDto };
