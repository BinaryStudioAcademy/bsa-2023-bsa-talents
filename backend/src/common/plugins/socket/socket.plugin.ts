import { type FastifyInstance, type FastifyPluginCallback } from 'fastify';
import { Server } from 'socket.io';

import { SocketEvent } from './enums/enums.js';

const socket: FastifyPluginCallback = (
    fastify: FastifyInstance,
    _options,
    done,
) => {
    const io = new Server(fastify.server, {
        cors: {
            origin: '*',
            credentials: true,
        },
    });

    io.on(SocketEvent.CONNECTION, (socket) => {
        socket.on(SocketEvent.CHAT_JOIN_ROOM, (roomId) => {
            return socket.join(roomId);
        });

        socket.on(SocketEvent.CHAT_LEAVE_ROOM, (roomId) => {
            return socket.leave(roomId);
        });

        socket.on(SocketEvent.CHAT_CREATE_MESSAGE, (message, roomId) => {
            if (socket.rooms.has(roomId)) {
                socket.to(roomId).emit(SocketEvent.CHAT_ADD_MESSAGE, message);
            }
        });
    });

    done();
};

export { socket };
