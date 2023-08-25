import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { BottomTabScreenName } from '~/bundles/common/enums/enums';
import { type BottomTabNavigationParameterList } from '~/bundles/common/types/types';
import { Mail, Person, SharedFolder } from '~/bundles/users/screens/screens';

import { bottomTabStyles } from './styles';

const BottomTab = createBottomTabNavigator<BottomTabNavigationParameterList>();

const iconSize = 24;

const MainBottomTabNavigator: React.FC = () => {
    return (
        <BottomTab.Navigator screenOptions={bottomTabStyles}>
            <BottomTab.Screen
                name={BottomTabScreenName.SHARED_FOLDER}
                component={SharedFolder}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="folder-shared"
                            size={iconSize}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name={BottomTabScreenName.MAIL}
                component={Mail}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="mail" size={iconSize} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name={BottomTabScreenName.PERSON}
                component={Person}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" size={iconSize} color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export { MainBottomTabNavigator };
