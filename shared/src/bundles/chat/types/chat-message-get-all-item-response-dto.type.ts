import { type UserFindResponseDto } from '../../users/users.js';

type ChatMessageGetAllItemResponseDto = {
    id: string;
    receiver: UserFindResponseDto;
    sender: UserFindResponseDto;
    message: string;
    createdAt: string;
    chatId: string;
};

export { type ChatMessageGetAllItemResponseDto };
