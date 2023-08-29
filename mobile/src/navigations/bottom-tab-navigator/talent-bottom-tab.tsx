import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { BottomTabScreenName } from '~/bundles/common/enums/enums';
import { type BottomTabNavigationParameterList } from '~/bundles/common/types/types';
import { Mail, Person } from '~/bundles/talent/screens/screens';

import { bottomTabStyles } from './styles';

const BottomTab = createBottomTabNavigator<BottomTabNavigationParameterList>();

const iconSize = 24;

const TalentBottomTabNavigator: React.FC = () => {
    return (
        <BottomTab.Navigator screenOptions={bottomTabStyles}>
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

export { TalentBottomTabNavigator };
