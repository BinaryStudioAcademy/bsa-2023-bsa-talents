const SocketEvent = {
    JOIN_ROOM: 'join room',
    LEAVE_ROOM: 'leave room',
    GET_MESSAGE: 'get message',
    SEND_MESSAGE: 'send message',
} as const;

export { SocketEvent };
