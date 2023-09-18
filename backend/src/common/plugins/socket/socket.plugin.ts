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

    io.of(SocketNamespace.CHAT).on(SocketEvent.CONNECTION, (socket) => {
        socket.on(SocketEvent.CHAT_JOIN_ROOM, (chatId: string) => {
            return socket.join(chatId);
        });

        socket.on(SocketEvent.CHAT_LEAVE_ROOM, (chatId: string) => {
            return socket.leave(chatId);
        });

        socket.on(
            SocketEvent.CHAT_CREATE_MESSAGE,
            (payload: ChatMessageGetAllItemResponseDto) => {
                if (socket.rooms.has(payload.chatId)) {
                    socket
                        .to(payload.chatId)
                        .emit(SocketEvent.CHAT_ADD_MESSAGE, payload);
                }
            },
        );
    });

    done();
};

export { socket };
