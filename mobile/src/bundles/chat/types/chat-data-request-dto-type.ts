type ChatDataRequestDto = {
    id: string;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead?: boolean;
    createdAt?: string;
    updatedAt?: string;
    receiverName?: string;
    receiverAvatar?: string;
    senderName?: string;
    senderAvatar?: string;
};

export { type ChatDataRequestDto };
