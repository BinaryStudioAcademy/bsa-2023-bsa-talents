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

    const activeChatRooms = new Map<string, string[]>();

    io.of(SocketNamespace.CHAT).on(SocketEvent.CONNECTION, (socket) => {
        socket.on(
            SocketEvent.CHAT_JOIN_ROOM,
            ({ userId, chatId }: { userId: string; chatId: string }) => {
                if (activeChatRooms.has(chatId)) {
                    const oldValue = activeChatRooms.get(chatId) as string[];
                    const newValue = oldValue.includes(userId)
                        ? oldValue
                        : [...oldValue, userId];

                    activeChatRooms.set(chatId, newValue);
                } else {
                    activeChatRooms.set(chatId, [userId]);
                }
            },
        );

        socket.on(
            SocketEvent.CHAT_LEAVE_ROOM,
            ({ userId, chatId }: { userId: string; chatId: string }) => {
                const oldValue = activeChatRooms.get(chatId);
                const ONE = 1;
                if (oldValue && oldValue.length > ONE) {
                    const newValue = oldValue.filter((it) => it !== userId);
                    activeChatRooms.set(chatId, newValue);
                } else {
                    activeChatRooms.delete(chatId);
                }
            },
        );

        socket.on(
            SocketEvent.CHAT_CREATE_MESSAGE,
            (payload: MessageResponseDto) => {
                socket.broadcast.emit(SocketEvent.CHAT_ADD_MESSAGE, payload);
            },
        );

        socket.on(SocketEvent.DISCONNECT, () => {
            // TODO: What do went to do for disconnection from socket
        });
    });

    done();
};

export { socket };
