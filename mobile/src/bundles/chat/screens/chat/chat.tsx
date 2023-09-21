import React from 'react';

import {
    ChatHeader,
    ChatItem,
    MessageEntryField,
} from '~/bundles/chat/components/components';
import {
    EMPLOYER_ID,
    INTERVAL,
    newMessageForChat1,
    newMessageForChat2,
} from '~/bundles/chat/constants/constants';
import { findUserInChat } from '~/bundles/chat/helpers/helpers';
import { actions as chatActions } from '~/bundles/chat/store';
import { type ChatDataRequestDto } from '~/bundles/chat/types/types';
import { FlatList, View } from '~/bundles/common/components/components';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ChatNavigationProperties } from '~/bundles/common/types/types';

import { styles } from './styles';

const Chat: React.FC = () => {
    const route = useAppRoute();
    const { chatId } = route.params as ChatNavigationProperties;
    const { chatData } = useAppSelector(({ chat }) => chat);
    const dispatch = useAppDispatch();
    const chatMessages = chatData ? chatData[chatId] : [];

    //TODO delete when information about the conversation partner is known
    const conversationPartner = findUserInChat(chatMessages, EMPLOYER_ID);

    const handleSendMessage = useCallback(
        (payload: ChatDataRequestDto): void => {
            void dispatch(chatActions.sendMessage(payload));
            //TODO delete after demonstration
            setTimeout(
                () =>
                    void dispatch(
                        chatActions.sendMessage({
                            ...newMessageForChat1,
                            id: new Date().toISOString(),
                            createdAt: new Date().toISOString(),
                        }),
                    ),
                INTERVAL,
            );
            setTimeout(
                () =>
                    void dispatch(
                        chatActions.sendMessage({
                            ...newMessageForChat2,
                            id: new Date().toISOString(),
                            createdAt: new Date().toISOString(),
                        }),
                    ),
                INTERVAL,
            );
        },
        [dispatch],
    );

    const renderMessageItem = ({
        item,
    }: {
        item: ChatDataRequestDto;
    }): React.ReactElement => {
        return (
            <ChatItem
                key={item.id}
                senderId={item.senderId}
                senderAvatar={item.senderAvatar ?? ''}
                message={item.message}
            />
        );
    };

    return (
        <View style={[globalStyles.flex1, styles.chatContainer]}>
            <ChatHeader />
            <FlatList
                style={[
                    globalStyles.flex1,
                    globalStyles.pb15,
                    globalStyles.mh15,
                    styles.chatList,
                ]}
                data={chatMessages}
                keyExtractor={(item): string => item.id}
                renderItem={renderMessageItem}
                inverted={true}
                showsVerticalScrollIndicator={false}
            />
            <MessageEntryField
                chatId={chatId}
                conversationPartner={conversationPartner}
                onSendMessage={handleSendMessage}
            />
        </View>
    );
};

export { Chat };
