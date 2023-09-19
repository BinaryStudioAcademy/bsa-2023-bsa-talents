import React from 'react';

import { FlatList, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useCallback, useMemo, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { ChatListItem, Search } from '~/bundles/employer/components/components';
import { type ChatListItemType } from '~/bundles/employer/types/types';

import { listItems } from './constants/constants';
import { styles } from './styles';

const Chat: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const filteredChats = useMemo(() => {
        return listItems.filter(
            ({ lastMessage }) =>
                lastMessage
                    ?.trim()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
        );
    }, [searchQuery]);

    const renderListItem = ({
        item,
    }: {
        item: ChatListItemType;
    }): React.ReactElement => {
        return (
            <ChatListItem
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
            <View style={[globalStyles.p25, styles.header]}>
                <Text category={TextCategory.H3}>Chat</Text>
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
                    data={filteredChats}
                    renderItem={renderListItem}
                    keyExtractor={(item): string => item.userId}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export { Chat };
