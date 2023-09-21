import { type FastifyInstance, type FastifyPluginCallback } from 'fastify';
import { type MessageResponseDto } from 'shared/build/index.js';
import { Server } from 'socket.io';

import { SocketEvent, SocketNamespace } from './enums/enums.js';

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

    const connectedUsers = new Map();

    io.of(SocketNamespace.CHAT).on(SocketEvent.CONNECTION, (socket) => {
        const userId = socket.handshake.query.userId;
        connectedUsers.set(userId, socket.id);

        socket.on(SocketEvent.CHAT_JOIN_ROOM, (chatId: string) => {
            return socket.join(chatId);
        });

        socket.on(SocketEvent.CHAT_LEAVE_ROOM, (chatId: string) => {
            return socket.leave(chatId);
        });

        socket.on(
            SocketEvent.CHAT_CREATE_MESSAGE,
            (payload: MessageResponseDto) => {
                const receiverId = connectedUsers.get(payload.receiverId);
                if (receiverId) {
                    socket
                        .to(receiverId)
                        .emit(SocketEvent.CHAT_ADD_MESSAGE, payload);
                }
            },
        );

        socket.on(SocketEvent.DISCONNECT, () => {
            const userId = [...connectedUsers.values()].find(
                (it) => it === socket.id,
            );
            connectedUsers.delete(userId);
        });
    });

    done();
};

export { socket };
