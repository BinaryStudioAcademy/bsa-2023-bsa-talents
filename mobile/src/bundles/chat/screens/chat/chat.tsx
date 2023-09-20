import React from 'react';

import { ChatBackButton } from '~/bundles/chat/components/components';
import { Text } from '~/bundles/common/components/components';
import { useAppRoute } from '~/bundles/common/hooks/hooks';
import { type ChatNavigationProperties } from '~/bundles/common/types/types';

const Chat: React.FC = () => {
    const route = useAppRoute();
    const { chatId } = route.params as ChatNavigationProperties;

    return (
        <>
            <ChatBackButton />
            <Text>{chatId}</Text>
        </>
    );
};

export { Chat };
