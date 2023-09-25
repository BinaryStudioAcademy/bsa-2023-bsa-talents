import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
    type ChatResponseDto,
    type MessageResponseDto,
} from '~/bundles/chat/types/types';
import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import {
    clearChatStore,
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
} from './actions';

type State = {
    chats: ChatResponseDto[];
    current: {
        chatId: string | null;
        messages: MessageResponseDto[];
    };
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    chats: [],
    current: {
        chatId: null,
        messages: [],
    },
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        addMessage: (state, action) => {
            const chat = state.chats.find(
                (chat) => chat.chatId === action.payload.chatId,
            );

            if (chat) {
                chat.lastMessage = action.payload.message;
            }

            if (state.current.chatId === action.payload.chatId) {
                state.current.messages = [
                    ...state.current.messages,
                    action.payload,
                ];
            }

            // state.current.messages = [
            //     ...state.current.messages,
            //     action.payload,
            // ];
        },
        updateChatId: (state, action) => {
            state.current.chatId = action.payload.chatId;
        },
    },
    extraReducers(builder) {
        builder.addCase(clearChatStore, (state) => {
            state.dataStatus = DataStatus.IDLE;
            state.chats = [];
            state.current = {
                chatId: null,
                messages: [],
            };
        });
        builder
            .addCase(getAllChatsByUserId.fulfilled, (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.chats = action.payload;
            })
            .addCase(getAllMessagesByChatId.fulfilled, (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.current.chatId = action.payload.chatId;
                state.current.messages = action.payload.messages;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;

                state.chats = state.chats.map((chat) => {
                    if (chat.chatId === action.payload.chatId) {
                        chat.lastMessage = action.payload.message;
                    }
                    return chat;
                });

                state.current.messages = [
                    ...state.current.messages,
                    action.payload,
                ];
            })
            .addMatcher(
                isAnyOf(
                    getAllMessages.pending,
                    getAllChatsByUserId.pending,
                    getAllMessagesByChatId.pending,
                    createMessage.pending,
                ),
                (state) => {
                    state.dataStatus = DataStatus.PENDING;
                },
            )
            .addMatcher(
                isAnyOf(
                    getAllMessages.rejected,
                    getAllChatsByUserId.rejected,
                    getAllMessagesByChatId.rejected,
                    createMessage.rejected,
                ),
                (state) => {
                    state.dataStatus = DataStatus.REJECTED;
                },
            );
    },
});

export { actions, name, reducer };
