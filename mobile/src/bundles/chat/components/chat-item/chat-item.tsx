import React from 'react';

import { Avatar, Text, View } from '~/bundles/common/components/components';
import { PhotoType } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    senderId: string;
    senderAvatar: string;
    message: string;
};

const ChatItem: React.FC<Properties> = ({ senderId, message }) => {
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const { partners } = useAppSelector(({ chat }) => chat);
    const isEmployer = senderId === currentUserData?.id;

    const avatar = (
        <Avatar
            uri={partners[senderId]}
            avatarSize={PhotoType.MEDIUM}
            customPhotoStyle={{
                photoShape: globalStyles.borderRadius15,
                defaultPhoto: globalStyles.borderRadius15,
            }}
        />
    );

    const textMessage = (
        <Text
            style={[
                globalStyles.borderRadius15,
                globalStyles.p15,
                isEmployer ? styles.receiver : styles.sender,
            ]}
        >
            {message}
        </Text>
    );

    return (
        <View style={globalStyles.pv5}>
            {isEmployer ? (
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentFlexEnd,
                        globalStyles.ml25,
                        styles.messageContainer,
                    ]}
                >
                    {textMessage}
                    {avatar}
                </View>
            ) : (
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.mr25,
                        styles.messageContainer,
                    ]}
                >
                    {avatar}
                    {textMessage}
                </View>
            )}
        </View>
    );
};

export { ChatItem };
