import React from 'react';

import {
    FlatList,
    Image,
    Pressable,
    Text,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useMemo, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { Search } from '../../components/components';
import { type MessageData, messages } from './constants/constants';
import { styles } from './styles';

const Chat: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = useMemo(() => {
        return messages.filter((message) =>
            message.lastMessage
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
        );
    }, [searchQuery]);

    const renderChatCard = ({
        item,
    }: {
        item: MessageData;
    }): React.ReactElement => {
        return (
            <Pressable
                onPress={(): void => {
                    null;
                }}
            >
                <View key={item.userId} style={styles.messageContainer}>
                    {item.avatar ? (
                        <Image
                            source={item.avatar}
                            style={styles.messageImage}
                        />
                    ) : (
                        <View style={styles.messageImage} />
                    )}
                    <View style={styles.messageInfo}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.userName}
                        >
                            {item.userName}
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.messageText}
                        >
                            {item.lastMessage}
                        </Text>
                    </View>
                    <Text style={styles.messageTimeDelivery}>
                        {item.lastMessageDate}
                    </Text>
                </View>
            </Pressable>
        );
    };

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
                />
                <FlatList
                    style={[
                        globalStyles.pb15,
                        globalStyles.mt10,
                        styles.chatList,
                    ]}
                    data={filteredChats}
                    renderItem={renderChatCard}
                    keyExtractor={(item): string => item.userId}
                />
            </View>
        </View>
    );
};

export { Chat };
