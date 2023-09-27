import React from 'react';

import { Chat, ChatUserDetails } from '~/bundles/chat/screens/screens';
import { ChatScreenName, UserRole } from '~/bundles/common/enums/enums';
import { createNativeStackNavigator } from '~/bundles/common/helpers/helpers';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import {
    type ChatNavigationParameterList,
    type NativeStackNavigationOptions,
} from '~/bundles/common/types/types';
import {
    EmployerBottomTabNavigator,
    TalentBottomTabNavigator,
} from '~/navigations/bottom-tab-navigator/bottom-tab-navigator';

const ChatStack = createNativeStackNavigator<ChatNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

const ChatNavigator: React.FC = () => {
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const { role } = currentUserData ?? {};
    return (
        <ChatStack.Navigator screenOptions={screenOptions}>
            <ChatStack.Screen
                name={ChatScreenName.CHAT_LIST}
                component={
                    role === UserRole.TALENT
                        ? TalentBottomTabNavigator
                        : EmployerBottomTabNavigator
                }
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
