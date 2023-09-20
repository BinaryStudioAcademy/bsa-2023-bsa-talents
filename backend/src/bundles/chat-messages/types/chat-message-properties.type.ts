type ChatMessageProperties = {
    id: string | null;
    senderId: string;
    receiverId: string;
    chatId: string;
    message: string;
    isRead: boolean;
};

export { type ChatMessageProperties };
