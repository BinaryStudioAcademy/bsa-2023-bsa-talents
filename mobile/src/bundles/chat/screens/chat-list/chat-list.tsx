import React from 'react';

import { ChatListItem, Search } from '~/bundles/chat/components/components';
import { sortChatsByDate } from '~/bundles/chat/helpers/helpers';
import { actions as chatActions } from '~/bundles/chat/store';
import { type ChatResponseDto } from '~/bundles/chat/types/types';
import {
    FlatList,
    LogoutButton,
    Text,
    View,
} from '~/bundles/common/components/components';
import { ChatScreenName, TextCategory } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useNavigation,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type ChatNavigationParameterList,
    type ChatNavigationProperties,
    type NavigationProp,
} from '~/bundles/common/types/types';

import { styles } from './styles';

const ChatList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentUserData: user } = useAppSelector(({ auth }) => auth);
    const { chats, current } = useAppSelector(({ chat }) => chat);
    const [searchQuery, setSearchQuery] = useState('');

    const navigation =
        useNavigation<NavigationProp<ChatNavigationParameterList>>();

    useEffect(() => {
        if (user) {
            void dispatch(chatActions.getAllChatsByUserId(user.id));
        }
    }, [dispatch, user, current.messages.length]);

    const filteredChats = useMemo(() => {
        return chats.filter(({ lastMessage }) => {
            return lastMessage
                .trim()
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        });
    }, [searchQuery, chats]);

    const sortedChats = useMemo(() => {
        return sortChatsByDate(filteredChats);
    }, [filteredChats]);

    const renderListItem = ({
        item,
    }: {
        item: ChatResponseDto;
    }): React.ReactElement => {
        return (
            <ChatListItem
                key={item.lastMessageCreatedAt}
                item={item}
                onSelect={handleChatSelect}
            />
        );
    };

    const handleChatSelect = useCallback(
        (payload: ChatNavigationProperties): void => {
            navigation.navigate(ChatScreenName.CHAT, payload);
        },
        [navigation],
    );

    return (
        <View style={globalStyles.flex1}>
            <View
                style={[
                    globalStyles.p25,
                    globalStyles.pr15,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.header,
                ]}
            >
                <Text category={TextCategory.H3}>Chat</Text>
                <LogoutButton />
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
                    keyExtractor={(item): string => item.lastMessageCreatedAt}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export { ChatList };
