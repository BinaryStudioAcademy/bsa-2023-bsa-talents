import React from 'react';

import { MaterialIcon } from '~/bundles/common/components/components';
import {
    IconName,
    TalentBottomTabScreenName,
} from '~/bundles/common/enums/enums';
import { createBottomTabNavigator } from '~/bundles/common/helpers/helpers';
import { type TalentBottomTabNavigationParameterList } from '~/bundles/common/types/types';
import { Mail, TalentProfile } from '~/bundles/talent/screens/screens';

import { bottomTabStyles } from '../styles';

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
                        <MaterialIcon
                            name={IconName.MAIL}
                            size={iconSize}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name={TalentBottomTabScreenName.TALENT_PROFILE}
                component={TalentProfile}
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

export { TalentBottomTabNavigator };
