import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { setPartnerAvatar } from '~/bundles/chat/helpers/helpers';
import {
    type ChatResponseDto,
    type CurrentChat,
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
    current: CurrentChat;
    partners: Record<string, string>;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    chats: [],
    current: {
        chatId: null,
        messages: [],
        employerDetails: {
            logoUrl: '',
            companyName: '',
            employerName: '',
            employerPosition: '',
            about: '',
            companyWebsite: '',
        },
    },
    partners: {},
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        joinRoom: (_, action) => {
            action.payload;
        },
        leaveRoom: (state, action) => {
            action.payload;
            state.current.chatId = null;
            state.current.messages = [];
            state.partners = {};
        },
        addMessage: (state, action) => {
            const chat = state.chats.find(
                (chat) => chat.chatId === action.payload.chatId,
            );

            if (chat) {
                chat.lastMessage = action.payload.message;
            }

            if (state.current.chatId === action.payload.chatId) {
                state.current.messages = [
                    action.payload,
                    ...state.current.messages,
                ];
            }
        },
        updateChatId: (state, action) => {
            state.current.chatId = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(clearChatStore, (state) => {
            state.dataStatus = DataStatus.IDLE;
            state.chats = [];
            state.current = {
                chatId: null,
                messages: [],
                employerDetails: {
                    logoUrl: '',
                    companyName: '',
                    employerName: '',
                    employerPosition: '',
                    about: '',
                    companyWebsite: '',
                },
            };
            state.partners = {};
        });
        builder
            .addCase(getAllChatsByUserId.fulfilled, (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.chats = action.payload;
                state.partners = setPartnerAvatar(state.chats, state.partners);
            })
            .addCase(getAllMessagesByChatId.fulfilled, (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.current.chatId = action.payload.chatId;
                state.current.messages = action.payload.messages.reverse();

                state.current.employerDetails = action.payload.employerDetails;
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
                    action.payload,
                    ...state.current.messages,
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
