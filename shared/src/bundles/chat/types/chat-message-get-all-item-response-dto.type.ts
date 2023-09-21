import { type UserDetailsFindRequestDto } from '../../user-details/types/types.js';

type ChatMessageGetAllItemResponseDto = {
    id: string;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead: boolean;
    sender?: UserDetailsFindRequestDto;
    receiver?: UserDetailsFindRequestDto;
};

export { type ChatMessageGetAllItemResponseDto };
