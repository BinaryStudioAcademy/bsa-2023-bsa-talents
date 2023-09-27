import React from 'react';

import { type ChatMessagesCreateRequestDto } from '~/bundles/chat/types/types';
import {
    CommunityIcon,
    Pressable,
    TextInput,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName } from '~/bundles/common/enums/enums';
import {
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    chatId: string;
    partnerId: string;
    onSendMessage: (payload: ChatMessagesCreateRequestDto) => void;
};

const MessageEntryField: React.FC<Properties> = ({
    chatId,
    partnerId,
    onSendMessage,
}) => {
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const [textMessage, setTextMessage] = useState('');

    const handleSendMessage = useCallback(() => {
        if (!textMessage.trim()) {
            return;
        }
        onSendMessage({
            chatId: chatId,
            senderId: currentUserData?.id ?? '',
            receiverId: partnerId,
            message: textMessage,
        });
        setTextMessage('');
    }, [chatId, partnerId, onSendMessage, textMessage, currentUserData?.id]);

    return (
        <View
            style={[
                globalStyles.mh15,
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
