type ChatMessageProperties = {
    id: string | null;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead: boolean;
    createdAt: string;
};

export { type ChatMessageProperties };
