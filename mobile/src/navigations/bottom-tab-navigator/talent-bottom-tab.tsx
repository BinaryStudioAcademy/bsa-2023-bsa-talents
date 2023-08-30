import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { TalentBottomTabScreenName } from '~/bundles/common/enums/enums';
import { type TalentBottomTabNavigationParameterList } from '~/bundles/common/types/types';
import { Mail, TalentProfile } from '~/bundles/talent/screens/screens';

import { bottomTabStyles } from './styles';

const BottomTab =
    createBottomTabNavigator<TalentBottomTabNavigationParameterList>();

const iconSize = 24;

const TalentBottomTabNavigator: React.FC = () => {
    return (
        <BottomTab.Navigator screenOptions={bottomTabStyles}>
            <BottomTab.Screen
                name={TalentBottomTabScreenName.MAIL}
                component={Mail}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="mail" size={iconSize} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name={TalentBottomTabScreenName.TALENT_PROFILE}
                component={TalentProfile}
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
