type MessageResponseDto = {
    id: string;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead: boolean;
    selfPhoto?: unknown;
};

export { type MessageResponseDto };
