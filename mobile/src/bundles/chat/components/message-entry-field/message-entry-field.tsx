import React from 'react';

import { EMPLOYER, EMPLOYER_ID } from '~/bundles/chat/constants/constants';
import {
    type ChatDataRequestDto,
    type UserInformation,
} from '~/bundles/chat/types/types';
import {
    CommunityIcon,
    Pressable,
    TextInput,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    chatId: string;
    conversationPartner: UserInformation;
    onSendMessage: (payload: ChatDataRequestDto) => void;
};

const MessageEntryField: React.FC<Properties> = ({
    chatId,
    conversationPartner,
    onSendMessage,
}) => {
    const [textMessage, setTextMessage] = useState('');

    //TODO change when information about the conversation partner is known
    const handleSendMessage = useCallback(() => {
        if (!textMessage.trim()) {
            return;
        }
        onSendMessage({
            id: new Date().toISOString(),
            chatId: chatId,
            senderId: EMPLOYER_ID,
            senderName: EMPLOYER,
            receiverId: conversationPartner?.id ?? '',
            receiverAvatar: conversationPartner?.name,
            receiverName: conversationPartner?.avatar,
            message: textMessage,
            createdAt: new Date().toISOString(),
        });
        setTextMessage('');
    }, [chatId, conversationPartner, onSendMessage, textMessage]);

    return (
        <View
            style={[
                globalStyles.mh25,
                globalStyles.mb15,
                globalStyles.borderRadius15,
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                styles.container,
            ]}
        >
            <TextInput
                value={textMessage}
                onChangeText={setTextMessage}
                placeholder="Type a message"
                multiline
                maxLength={1000}
                style={[
                    globalStyles.flex1,
                    globalStyles.ph15,
                    styles.textEntryField,
                ]}
            />
            <Pressable onPress={handleSendMessage}>
                <CommunityIcon
                    name={IconName.SEND}
                    size={25}
                    color={Color.PRIMARY}
                    style={[globalStyles.ph5, styles.sendIcon]}
                />
            </Pressable>
        </View>
    );
};

export { MessageEntryField };
