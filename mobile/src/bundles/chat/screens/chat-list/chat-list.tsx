import React from 'react';

import { ChatListItem, Search } from '~/bundles/chat/components/components';
import {
    newMessageForChat1,
    newMessageForChat2,
} from '~/bundles/chat/constants/constants';
import { sortChatsByDate } from '~/bundles/chat/helpers/helpers';
import { actions as chatActions } from '~/bundles/chat/store';
import { type ChatItem } from '~/bundles/chat/types/types';
import {
    Button,
    FlatList,
    Text,
    View,
} from '~/bundles/common/components/components';
import { RootScreenName, TextCategory } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useMemo,
    useNavigation,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type ChatNavigationProperties,
    type NavigationProp,
    type RootNavigationParameterList,
} from '~/bundles/common/types/types';

import { styles } from './styles';

const ChatList: React.FC = () => {
    const { chatData } = useAppSelector(({ chat }) => chat);
    const dispatch = useAppDispatch();
    const navigation =
        useNavigation<NavigationProp<RootNavigationParameterList>>();

    const [searchQuery, setSearchQuery] = useState('');

    //TODO delete after testing
    const handleSendMessage1 = useCallback(() => {
        const payload = {
            ...newMessageForChat1,
            createdAt: new Date().toISOString(),
        };
        void dispatch(chatActions.sendMessage(payload));
    }, [dispatch]);

    const handleSendMessage2 = useCallback(() => {
        const payload = {
            ...newMessageForChat2,
            createdAt: new Date().toISOString(),
        };
        void dispatch(chatActions.sendMessage(payload));
    }, [dispatch]);

    const transformedChatData = useMemo(() => {
        return chatData
            ? Object.entries(chatData).map(([chatId, messages]) => {
                  const lastMessage = messages[0];
                  return {
                      chatId: chatId,
                      senderName: lastMessage.senderName,
                      senderAvatar: lastMessage.senderAvatar,
                      lastMessage: lastMessage.message,
                      lastMessageDate: lastMessage.createdAt,
                  };
              })
            : [];
    }, [chatData]);

    const filteredChats = useMemo(() => {
        return transformedChatData.filter((chat) => {
            const { lastMessage } = chat;
            return lastMessage
                .trim()
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        });
    }, [transformedChatData, searchQuery]);

    const sortedChats = useMemo(() => {
        return sortChatsByDate(filteredChats);
    }, [filteredChats]);

    const renderListItem = ({
        item,
    }: {
        item: ChatItem;
    }): React.ReactElement => {
        return (
            <ChatListItem
                key={item.lastMessage}
                item={item}
                onSelect={handleChatSelect}
            />
        );
    };

    const handleChatSelect = useCallback(
        (payload: ChatNavigationProperties): void => {
            navigation.navigate(RootScreenName.CHAT_ROOT_ROUTE, payload);
        },
        [navigation],
    );

    return (
        <View style={globalStyles.flex1}>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.p25,
                    styles.header,
                ]}
            >
                <Text category={TextCategory.H3}>Chat</Text>
                <Button label="To Chat 1" onPress={handleSendMessage1} />
                <Button label="To Chat 2" onPress={handleSendMessage2} />
            </View>
            <View
                style={[
                    globalStyles.ph15,
                    globalStyles.pt10,
                    globalStyles.flex1,
                    styles.chatContainer,
                ]}
            >
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    containerStyle={styles.search}
                />
                <FlatList
                    style={[
                        globalStyles.pb15,
                        globalStyles.mt10,
                        styles.chatList,
                    ]}
                    data={sortedChats}
                    renderItem={renderListItem}
                    keyExtractor={(item): string => item.chatId}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export { ChatList };