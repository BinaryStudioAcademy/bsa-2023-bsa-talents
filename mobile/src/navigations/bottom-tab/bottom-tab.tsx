import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { BottomTabScreenName } from '~/bundles/common/enums/enums';
import { type BottomTabNavigationParameterList } from '~/bundles/common/types/types';
import { Mail, Person, SharedFolder } from '~/bundles/users/screens/screens';

import { generateTabBarIcon } from './generate-tab-bar-icon';
import { bottomTabStyles } from './styles';

const BottomTab = createBottomTabNavigator<BottomTabNavigationParameterList>();

const BottomTabNavigator: React.FC = () => {
    return (
        <BottomTab.Navigator screenOptions={bottomTabStyles}>
            <BottomTab.Screen
                name={BottomTabScreenName.SHARED_FOLDER}
                component={SharedFolder}
                options={{
                    tabBarIcon: ({ color }) =>
                        generateTabBarIcon({
                            name: 'folder-shared',
                            color,
                        }),
                }}
            />
            <BottomTab.Screen
                name={BottomTabScreenName.MAIL}
                component={Mail}
                options={{
                    tabBarIcon: ({ color }) =>
                        generateTabBarIcon({
                            name: 'mail',
                            color,
                        }),
                }}
            />
            <BottomTab.Screen
                name={BottomTabScreenName.PERSON}
                component={Person}
                options={{
                    tabBarIcon: ({ color }) =>
                        generateTabBarIcon({
                            name: 'person',
                            color,
                        }),
                }}
            />
        </BottomTab.Navigator>
    );
};

export { BottomTabNavigator };
