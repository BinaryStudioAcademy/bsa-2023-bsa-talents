import React from 'react';

import {
    Chat,
    ChatList,
    ChatUserDetails,
} from '~/bundles/chat/screens/screens';
import { ChatScreenName } from '~/bundles/common/enums/enums';
import { createNativeStackNavigator } from '~/bundles/common/helpers/helpers';
import {
    type ChatNavigationParameterList,
    type NativeStackNavigationOptions,
} from '~/bundles/common/types/types';

const ChatStack = createNativeStackNavigator<ChatNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

const ChatNavigator: React.FC = () => {
    return (
        <ChatStack.Navigator screenOptions={screenOptions}>
            <ChatStack.Screen
                name={ChatScreenName.CHAT_LIST}
                component={ChatList}
            />
            <ChatStack.Screen name={ChatScreenName.CHAT} component={Chat} />
            <ChatStack.Screen
                name={ChatScreenName.CHAT_USER_DETAILS}
                component={ChatUserDetails}
            />
        </ChatStack.Navigator>
    );
};

export { ChatNavigator };
