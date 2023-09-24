const ChatMessagesApiPath = {
    ROOT: '/',
    $CHAT_ID: '/:chatId',
    CHATS_$USER_ID: '/chats/:userId',
    READ_$MESSAGE_ID: '/read/:messageId',
} as const;

export { ChatMessagesApiPath };
