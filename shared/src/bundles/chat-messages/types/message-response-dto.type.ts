type MessageResponseDto = {
    id: string;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead: boolean;
    createdAt: string;
};

export { type MessageResponseDto };
