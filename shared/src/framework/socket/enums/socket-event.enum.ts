const SocketEvent = {
    CHAT_JOIN_ROOM: 'chat-join-room',
    CHAT_LEAVE_ROOM: 'chat-leave-room',
    CHAT_CREATE_MESSAGE: 'chat-create-message',
    CHAT_ADD_MESSAGE: 'chat-add-message',
    CHAT_TYPE_MESSAGE: 'chat-type-message',
    CONNECTION: 'connection',
} as const;

export { SocketEvent };
