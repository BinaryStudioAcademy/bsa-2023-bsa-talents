type ChatMessagesResponseDto = {
    id: string | null;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead: boolean;
};

export { type ChatMessagesResponseDto };
