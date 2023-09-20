import React from 'react';

import {
    Button,
    FlatList,
    Text,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { ChatListItem, Search } from '~/bundles/employer/components/components';
import { actions as chatActions } from '~/bundles/employer/store';
import { type ChatListItemType } from '~/bundles/employer/types/types';

import { styles } from './styles';

const Chat: React.FC = () => {
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const { chatData } = useAppSelector(({ employers }) => employers);
    const dispatch = useAppDispatch();

    //TODO delete after testing
    const handleSendMessage1 = useCallback(() => {
        const newMessage = {
            employerId: currentUserData?.id ?? '',
            talentId: 'u1',
            talentName: 'Talent Name 1',
            message: 'New message text1',
        };

        void dispatch(chatActions.sendMessage(newMessage));
    }, [dispatch, currentUserData?.id]);

    const handleSendMessage2 = useCallback(() => {
        const newMessage = {
            employerId: currentUserData?.id ?? '',
            talentId: 'u2',
            talentName: 'Talent Name 2',
            message: 'New message text2',
        };

        void dispatch(chatActions.sendMessage(newMessage));
    }, [dispatch, currentUserData?.id]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const transformedChatData = useMemo(() => {
        return chatData?.map((chat) => ({
            userId: chat.talentId,
            username: chat.talentName,
            avatar: chat.talentAvatar,
            lastMessage: chat.data?.[0]?.message,
            lastMessageDate: chat.data?.[0]?.createdAt,
            isSelected: false,
        }));
    }, [chatData]);

    const filteredChats = useMemo(() => {
        return transformedChatData?.filter(
            ({ lastMessage }) =>
                lastMessage
                    ?.trim()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
        );
    }, [transformedChatData, searchQuery]);

    const sortedChats = useMemo(() => {
        if (!filteredChats) {
            return [];
        }

        return [...filteredChats].sort((a, b) => {
            const dateA = new Date(a.lastMessageDate ?? '').getTime();
            const dateB = new Date(b.lastMessageDate ?? '').getTime();
            return dateB - dateA;
        });
    }, [filteredChats]);

    const renderListItem = ({
        item,
    }: {
        item: ChatListItemType;
    }): React.ReactElement => {
        return (
            <ChatListItem
                key={item.lastMessageDate}
                item={item}
                isSelected={item.userId === selectedItemId}
                onSelect={handleChatSelect}
            />
        );
    };

    const handleChatSelect = useCallback(
        (userId: string): void => {
            setSelectedItemId(userId);
        },
        [setSelectedItemId],
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
                <Button label="Send 1" onPress={handleSendMessage1} />
                <Button label="Send 2" onPress={handleSendMessage2} />
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
                    keyExtractor={(item): string => item.userId}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export { Chat };
