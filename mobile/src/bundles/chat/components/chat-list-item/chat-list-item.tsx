import React from 'react';

import { useRealTimeElapsed } from '~/bundles/chat/hooks/hooks';
import { type ChatItem } from '~/bundles/chat/types/types';
import {
    Avatar,
    Pressable,
    Text,
    View,
} from '~/bundles/common/components/components';
import { PhotoType } from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ChatNavigationProperties } from '~/bundles/common/types/types';

import { styles } from './styles';

type Properties = {
    item: ChatItem;
    onSelect: (payload: ChatNavigationProperties) => void;
};

const ChatListItem: React.FC<Properties> = ({ item, onSelect }) => {
    const { chatId, senderName, senderAvatar, lastMessage, lastMessageDate } =
        item;
    const lastMessageTimeDelivery = useRealTimeElapsed(lastMessageDate ?? '');

    const itemAvatar = (
        <Avatar
            uri={senderAvatar}
            avatarSize={PhotoType.MEDIUM}
            customPhotoStyle={{
                photoShape: globalStyles.borderRadius15,
                defaultPhoto: globalStyles.borderRadius15,
            }}
        />
    );

    const itemContent = (
        <View style={[globalStyles.flex1, globalStyles.ph10]}>
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[globalStyles.mb5, styles.userName]}
            >
                {senderName}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>
                {lastMessage ?? ''}
            </Text>
        </View>
    );

    const itemTimeDelivery = (
        <Text style={styles.timeDelivery}>{lastMessageTimeDelivery}</Text>
    );

    const handleListItemSelect = useCallback((): void => {
        onSelect({ chatId });
    }, [onSelect, chatId]);

    return (
        <Pressable onPress={handleListItemSelect}>
            <View style={[globalStyles.flexDirectionRow, globalStyles.p10]}>
                {itemAvatar}
                {itemContent}
                {itemTimeDelivery}
            </View>
        </Pressable>
    );
};

export { ChatListItem };
