import { type EmployerDetails, type MessageResponseDto } from './types';

type CurrentChat = {
    chatId: string | null;
    messages: MessageResponseDto[];
    employerDetails: EmployerDetails;
};

export { type CurrentChat };
