import React from 'react';

import { ChatList } from '~/bundles/chat/screens/screens';
import { MaterialIcon } from '~/bundles/common/components/components';
import {
    EmployerBottomTabScreenName,
    IconName,
} from '~/bundles/common/enums/enums';
import { createBottomTabNavigator } from '~/bundles/common/helpers/helpers';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { type EmployerBottomTabNavigationParameterList } from '~/bundles/common/types/types';
import {
    Candidates,
    EmployerProfile,
} from '~/bundles/employer/screens/screens';
import { notifications } from '~/framework/notifications/notifications';

import { bottomTabStyles } from '../styles';

const BottomTab =
    createBottomTabNavigator<EmployerBottomTabNavigationParameterList>();

const iconSize = 24;

const EmployerBottomTabNavigator: React.FC = () => {
    const { isApproved } =
        useAppSelector(({ talents }) => talents.onboardingData) ?? {};

    return (
        <BottomTab.Navigator
            screenOptions={bottomTabStyles}
            initialRouteName={EmployerBottomTabScreenName.EMPLOYER_PROFILE}
        >
            <BottomTab.Screen
                name={EmployerBottomTabScreenName.CANDIDATES}
                component={Candidates}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcon
                            name={IconName.FOLDER_SHARED}
                            size={iconSize}
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
                name={EmployerBottomTabScreenName.CHAT_LIST}
                component={ChatList}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcon
                            name={IconName.MAIL}
                            size={iconSize}
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
                name={EmployerBottomTabScreenName.EMPLOYER_PROFILE}
                component={EmployerProfile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcon
                            name={IconName.PERSON}
                            size={iconSize}
                            color={color}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export { EmployerBottomTabNavigator };
