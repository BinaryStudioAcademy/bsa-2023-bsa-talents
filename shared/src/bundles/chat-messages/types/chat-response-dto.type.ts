import { type PartnerDto } from './partner-dto.type.js';

type ChatResponseDto = {
    chatId: string;
    lastMessageCreatedAt: string;
    lastMessage: string;
    partner: PartnerDto;
};

export { type ChatResponseDto };
