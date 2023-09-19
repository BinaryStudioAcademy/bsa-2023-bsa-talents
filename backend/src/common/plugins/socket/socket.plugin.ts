import { type FastifyInstance, type FastifyPluginCallback } from 'fastify';
import { Server } from 'socket.io';

import { SocketEvent, SocketNamespace } from './enums/enums.js';
import { type ChatMessageGetAllItemResponseDto } from './types/types.js';

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
            (payload: ChatMessageGetAllItemResponseDto) => {
                const receiverId = connectedUsers.get(payload.receiver.id);
                if (receiverId) {
                    socket
                        .to(receiverId)
                        .emit(SocketEvent.CHAT_ADD_MESSAGE, payload);
                }
            },
        );

        socket.on('disconnect', () => {
            const userId = [...connectedUsers.values()].find(
                (it) => it === socket.id,
            );
            connectedUsers.delete(userId);
        });
    });

    done();
};

export { socket };
