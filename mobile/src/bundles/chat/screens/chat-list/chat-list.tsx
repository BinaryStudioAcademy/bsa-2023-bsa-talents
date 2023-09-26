import React from 'react';

import { logout } from '~/bundles/auth/store/actions';
import { ChatListItem, Search } from '~/bundles/chat/components/components';
import { sortChatsByDate } from '~/bundles/chat/helpers/helpers';
import { type ChatItem } from '~/bundles/chat/types/types';
import {
    CommunityIcon,
    FlatList,
    Pressable,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    Color,
    IconName,
    RootScreenName,
    TextCategory,
} from '~/bundles/common/enums/enums';
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
    const dispatch = useAppDispatch();
    const { chatData } = useAppSelector(({ chat }) => chat);
    const navigation =
        useNavigation<NavigationProp<RootNavigationParameterList>>();

    const [searchQuery, setSearchQuery] = useState('');

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
            navigation.navigate(RootScreenName.CHAT, payload);
        },
        [navigation],
    );

    const handleLogout = (): void => {
        void dispatch(logout());
    };

    return (
        <View style={globalStyles.flex1}>
            <View
                style={[
                    globalStyles.p25,
                    globalStyles.pr10,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.header,
                ]}
            >
                <Text category={TextCategory.H3}>Chat</Text>
                <Pressable onPress={handleLogout}>
                    <CommunityIcon
                        name={IconName.LOGOUT}
                        size={30}
                        color={Color.TEXT2}
                    />
                </Pressable>
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
                    containerStyle={[
                        globalStyles.borderRadius15,
                        globalStyles.p15,
                        styles.search,
                    ]}
                />
                <FlatList
                    style={[globalStyles.pb15, styles.chatList]}
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
