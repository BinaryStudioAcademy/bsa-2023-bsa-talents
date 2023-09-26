import React from 'react';

import {
    ChatHeader,
    ChatItem,
    MessageEntryField,
} from '~/bundles/chat/components/components';
import { findUserInChat } from '~/bundles/chat/helpers/helpers';
import { actions as chatActions } from '~/bundles/chat/store';
import { type ChatMessagesCreateRequestDto } from '~/bundles/chat/types/types';
import { FlatList, View } from '~/bundles/common/components/components';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ChatNavigationProperties } from '~/bundles/common/types/types';

import { styles } from './styles';

const Chat: React.FC = () => {
    const route = useAppRoute();
    const dispatch = useAppDispatch();
    const { chatId, partnerName, partnerAvatar, partnerId } =
        route.params as ChatNavigationProperties;
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const { current } = useAppSelector(({ chat }) => chat);
    const messages = [...current.messages].reverse();

    //TODO delete when information about the conversation partner is known
    const conversationPartner = findUserInChat(
        current.messages,
        currentUserData?.id ?? '',
    );

    useEffect(() => {
        void dispatch(
            chatActions.getAllMessagesByChatId({
                chatId,
                employerId: currentUserData?.id ?? '',
            }),
        );
    }, [dispatch, chatId, currentUserData?.id]);

    const handleSendMessage = useCallback(
        (payload: ChatMessagesCreateRequestDto): void => {
            void dispatch(chatActions.createMessage(payload));
        },
        [dispatch],
    );

    const renderMessageItem = ({
        item,
    }: {
        item: ChatMessagesCreateRequestDto;
    }): React.ReactElement => {
        return (
            <ChatItem
                key={item.chatId}
                senderId={item.senderId}
                senderAvatar={''}
                message={item.message}
            />
        );
    };

    return (
        <View style={[globalStyles.flex1, styles.chatContainer]}>
            <ChatHeader
                partnerName={partnerName}
                partnerAvatar={partnerAvatar}
            />
            <FlatList
                style={[
                    globalStyles.flex1,
                    globalStyles.pb15,
                    globalStyles.mh15,
                    styles.chatList,
                ]}
                data={messages}
                keyExtractor={(item): string => item.id}
                renderItem={renderMessageItem}
                inverted={true}
                showsVerticalScrollIndicator={false}
            />
            <MessageEntryField
                chatId={chatId}
                partnerId={partnerId}
                conversationPartner={conversationPartner}
                onSendMessage={handleSendMessage}
            />
        </View>
    );
};

export { Chat };
