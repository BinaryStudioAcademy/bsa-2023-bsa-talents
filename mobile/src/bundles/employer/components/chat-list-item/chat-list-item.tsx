import React from 'react';

import {
    Image,
    Pressable,
    Text,
    View,
} from '~/bundles/common/components/components';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { useRealTimeElapsed } from '~/bundles/employer/hooks/hooks';
import { type ChatListItemType } from '~/bundles/employer/types/types';

import { styles } from './styles';

type Properties = {
    item: ChatListItemType;
    isSelected: boolean;
    onSelect: (userId: string) => void;
};

const ChatListItem: React.FC<Properties> = ({ item, isSelected, onSelect }) => {
    const { userId, username, avatar, lastMessage, lastMessageDate } = item;

    const lastMessageTimeDelivery = useRealTimeElapsed(lastMessageDate ?? '');

    const itemAvatar = avatar ? (
        <Image source={{ uri: avatar }} style={styles.defaultAvatar} />
    ) : (
        <View style={styles.defaultAvatar} />
    );

    const itemContent = (
        <View style={[globalStyles.flex1, globalStyles.ph10]}>
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[globalStyles.mb5, styles.userName]}
            >
                {username}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>
                {lastMessage ?? ''}
            </Text>
        </View>
    );

    const timeDelivery = (
        <Text style={styles.timeDelivery}>{lastMessageTimeDelivery}</Text>
    );

    const handleListItemSelect = useCallback((): void => {
        onSelect(userId);
    }, [onSelect, userId]);

    return (
        <Pressable onPress={handleListItemSelect}>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.p10,
                    isSelected && styles.selectedItem,
                ]}
            >
                {itemAvatar}
                {itemContent}
                {timeDelivery}
            </View>
        </Pressable>
    );
};

export { ChatListItem };
