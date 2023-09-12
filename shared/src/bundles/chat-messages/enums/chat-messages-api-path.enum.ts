const ChatMessagesApiPath = {
    ROOT: '/',
    $CHAT_ID: '/:chatId',
    READ_$MESSAGE_ID: '/read/:messageId',
} as const;

export { ChatMessagesApiPath };
