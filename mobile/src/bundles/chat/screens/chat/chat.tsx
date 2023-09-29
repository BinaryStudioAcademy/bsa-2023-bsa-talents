import React, { useState } from 'react';

import {
    ChatHeader,
    ChatItem,
    MessageEntryField,
} from '~/bundles/chat/components/components';
import { actions as chatActions } from '~/bundles/chat/store';
import { type ChatMessagesCreateRequestDto } from '~/bundles/chat/types/types';
import { FlatList, Loader, View } from '~/bundles/common/components/components';
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
    const { current } = useAppSelector(({ chat }) => chat);
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const { id: userId } = currentUserData ?? {};
    const [isDataLoaded, setDataLoaded] = useState(false);

    const { chatId, partnerName, partnerAvatar, partnerId } =
        route.params as ChatNavigationProperties;

    useEffect(() => {
        void dispatch(
            chatActions.getAllMessagesByChatId({
                chatId,
                employerId: partnerId,
            }),
        ).then(() => {
            setDataLoaded(true);
        });

        void dispatch(
            chatActions.joinRoom({
                userId,
                chatId,
            }),
        );

        return () => {
            setDataLoaded(false);
        };
    }, [dispatch, chatId, partnerId, userId]);

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
        // console.log('CURRENT -', current.employerDetails);
        return (
            <ChatItem
                key={item.chatId}
                senderId={item.senderId}
                senderAvatar={current.employerDetails.logoUrl ?? ''}
                message={item.message}
            />
        );
    };

    if (!isDataLoaded) {
        return <Loader />;
    }

    return (
        <View style={[globalStyles.flex1, styles.chatContainer]}>
            <ChatHeader
                partnerName={partnerName}
                partnerAvatar={partnerAvatar}
                partnerId={partnerId}
                chatId={chatId}
            />
            <FlatList
                style={[
                    globalStyles.flex1,
                    globalStyles.pb15,
                    globalStyles.mh15,
                    styles.chatList,
                ]}
                data={current.messages}
                keyExtractor={(item): string => item.id}
                renderItem={renderMessageItem}
                inverted={true}
                showsVerticalScrollIndicator={false}
            />
            <MessageEntryField
                chatId={chatId}
                partnerId={partnerId}
                onSendMessage={handleSendMessage}
            />
        </View>
    );
};

export { Chat };
