import React from 'react';

import { EMPLOYER_ID } from '~/bundles/chat/constants/constants';
import { Avatar, Text, View } from '~/bundles/common/components/components';
import { PhotoType } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    senderId: string;
    senderAvatar: string;
    message: string;
};

const ChatItem: React.FC<Properties> = ({
    senderId,
    senderAvatar,
    message,
}) => {
    const isEmployer = senderId === EMPLOYER_ID;

    const avatar = (
        <Avatar
            uri={senderAvatar}
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
                        globalStyles.mr25,
                        styles.messageContainer,
                    ]}
                >
                    {avatar}
                    {textMessage}
                </View>
            ) : (
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
            )}
        </View>
    );
};

export { ChatItem };
