type MessageResponseDto = {
    id: string;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead: boolean;
};

export { type MessageResponseDto };
