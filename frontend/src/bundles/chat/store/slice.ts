import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
    getContactWithTalent,
    shareContactsWithCompany,
} from '~/bundles/candidate-details/store/actions.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    getHiringInfo,
    submitHiringInfo,
} from '~/bundles/hiring-info/store/actions.js';

import {
    type ChatResponseDto,
    type MessageResponseDto,
} from '../types/types.js';
import {
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
} from './actions.js';

type State = {
    chats: ChatResponseDto[];
    current: {
        chatId: string | null;
        talentId: string | null;
        talentHasSharedContacts: boolean;
        talentIsHired: boolean;
        messages: MessageResponseDto[];
        employerDetails:
            | {
                  logoUrl: string | null;
                  companyName: string | null;
                  employerName: string | null;
                  employerPosition: string | null;
                  about: string | null;
                  companyWebsite: string | null;
                  employerId: string | null;
              }
            | Record<string, never>;
    };
    onlineUsers: string[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    chats: [],
    current: {
        chatId: null,
        talentId: null,
        talentHasSharedContacts: false,
        talentIsHired: false,
        messages: [],
        employerDetails: {
            logoUrl: '',
            companyName: '',
            employerName: '',
            employerPosition: '',
            about: '',
            companyWebsite: '',
            employerId: '',
        },
    },
    onlineUsers: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        joinRoom: (state, action) => {
            action.payload;
        },
        leaveRoom: (state, action) => {
            action.payload;
            state.current.chatId = null;
            state.current.messages = [];
            state.current.talentHasSharedContacts = false;
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
                    ...state.current.messages,
                    action.payload,
                ];
            }
        },
        updateChatId: (state, action) => {
            state.current.chatId = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getAllChatsByUserId.fulfilled, (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.chats = action.payload;
            })
            .addCase(getContactWithTalent.fulfilled, (state, action) => {
                state.current.talentHasSharedContacts = action.payload;
            })

            .addCase(shareContactsWithCompany.fulfilled, (state) => {
                state.current.talentHasSharedContacts = true;
            })
            .addCase(getAllMessagesByChatId.fulfilled, (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.current.chatId = action.payload.chatId;
                state.current.messages = action.payload.messages;
                state.current.employerDetails = action.payload.employerDetails;
                state.current.talentId = action.payload.talentId;
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
            .addCase(getAllMessagesByChatId.pending, (state) => {
                state.dataStatus = DataStatus.PENDING;
                state.current.chatId = null;
                state.current.messages = [];
                state.current.employerDetails = {};
                state.current.talentId = null;
            })
            .addCase(submitHiringInfo.fulfilled, (state) => {
                state.current.talentIsHired = true;
            })

            .addCase(getHiringInfo.fulfilled, (state, action) => {
                state.current.talentIsHired = action.payload;
            })
            .addMatcher(
                isAnyOf(
                    getAllMessages.pending,
                    getAllChatsByUserId.pending,
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
