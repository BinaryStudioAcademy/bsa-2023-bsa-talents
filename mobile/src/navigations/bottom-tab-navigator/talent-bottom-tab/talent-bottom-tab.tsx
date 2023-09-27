import React from 'react';

import { ChatList } from '~/bundles/chat/screens/screens';
import { MaterialIcon } from '~/bundles/common/components/components';
import { ICON_SIZE } from '~/bundles/common/constants/constants';
import {
    IconName,
    TalentBottomTabScreenName,
} from '~/bundles/common/enums/enums';
import { createBottomTabNavigator } from '~/bundles/common/helpers/helpers';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { type TalentBottomTabNavigationParameterList } from '~/bundles/common/types/types';
import { notifications } from '~/framework/notifications/notifications';
import { TalentProfileNavigator } from '~/navigations/talent-profile-navigator/talent-profile-navigator';

// import { ChatNavigator } from '~/navigations/chat-navigator/chat-navigator';
import { bottomTabStyles } from '../styles';

const BottomTab =
    createBottomTabNavigator<TalentBottomTabNavigationParameterList>();

const TalentBottomTabNavigator: React.FC = () => {
    const { isApproved } =
        useAppSelector(({ common }) => common.onboardingData) ?? {};

    return (
        <BottomTab.Navigator
            screenOptions={bottomTabStyles}
            initialRouteName={TalentBottomTabScreenName.TALENT_PROFILE}
        >
            <BottomTab.Screen
                name={TalentBottomTabScreenName.MAIL}
                component={ChatList}
                options={{
                    tabBarIcon: ({ color = '#FFFFFF' }) => (
                        <MaterialIcon
                            name={IconName.MAIL}
                            size={ICON_SIZE}
                            color={color}
                        />
                    ),
                }}
                listeners={{
                    tabPress: (event): void => {
                        if (!isApproved) {
                            notifications.showError({
                                title: 'You are not verified to see other pages',
                            });
                            event.preventDefault();
                        }
                    },
                }}
            />
            <BottomTab.Screen
                name={TalentBottomTabScreenName.TALENT_PROFILE}
                component={TalentProfileNavigator}
                options={{
                    tabBarIcon: ({ color = '#FFFFFF' }) => (
                        <MaterialIcon
                            name={IconName.PERSON}
                            size={ICON_SIZE}
                            color={color}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export { TalentBottomTabNavigator };
