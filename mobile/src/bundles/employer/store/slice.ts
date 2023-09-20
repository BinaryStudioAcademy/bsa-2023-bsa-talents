import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { listItems } from '~/bundles/employer/constants/constants';
import { type ChatData } from '~/bundles/employer/types/types';

import { clearEmployerStore, getMessage, sendMessage } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    chatData: ChatData[] | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    chatData: listItems,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employers',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(clearEmployerStore, (state) => {
            state.dataStatus = DataStatus.IDLE;
            state.chatData = null;
        });
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            const { talentId, message, talentName, talentAvatar } =
                action.payload;
            const newMessageRecord = {
                message,
                createdAt: new Date().toISOString(),
            };

            const talentChat = state.chatData?.find(
                (chat) => chat.talentId === talentId,
            );

            if (talentChat) {
                talentChat.data?.unshift(newMessageRecord);
            } else {
                const newChatData: ChatData = {
                    talentId,
                    talentName,
                    talentAvatar,
                    data: [newMessageRecord],
                };
                state.chatData?.push(newChatData);
            }
        });
        builder.addMatcher(
            isAnyOf(getMessage.pending, sendMessage.pending),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(getMessage.rejected, sendMessage.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
