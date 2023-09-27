import React from 'react';

import {
    CommunityIcon,
    Pressable,
} from '~/bundles/common/components/components';
import { ChatScreenName, Color, IconName } from '~/bundles/common/enums/enums';
import { useCallback, useNavigation } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type ChatNavigationParameterList,
    type NavigationProp,
} from '~/bundles/common/types/types';

const ChatInfoButton: React.FC = () => {
    const { navigate } =
        useNavigation<NavigationProp<ChatNavigationParameterList>>();

    const handlePress = useCallback(() => {
        navigate(ChatScreenName.CHAT_USER_DETAILS);
    }, [navigate]);

    return (
        <Pressable onPress={handlePress} style={globalStyles.mr10}>
            <CommunityIcon
                name={IconName.INFORMATION}
                size={35}
                color={Color.TEXT2}
            />
        </Pressable>
    );
};

export { ChatInfoButton };
