const SocketEvent = {
    JOIN_ROOM: 'chat-join-room',
    LEAVE_ROOM: 'chat-leave-room',
    GET_MESSAGE: 'chat-add-message',
    SEND_MESSAGE: 'chat-create-message',
} as const;

export { SocketEvent };
