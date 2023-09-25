import React from 'react';

import { MaterialIcon } from '~/bundles/common/components/components';
import { ICON_SIZE } from '~/bundles/common/constants/constants';
import {
    IconName,
    TalentBottomTabScreenName,
} from '~/bundles/common/enums/enums';
import { createBottomTabNavigator } from '~/bundles/common/helpers/helpers';
import { type TalentBottomTabNavigationParameterList } from '~/bundles/common/types/types';
import { Mail } from '~/bundles/talent/screens/screens';
import { TalentProfileNavigator } from '~/navigations/talent-profile-navigator/talent-profile-navigator';

import { bottomTabStyles } from '../styles';

const BottomTab =
    createBottomTabNavigator<TalentBottomTabNavigationParameterList>();

const TalentBottomTabNavigator: React.FC = () => {
    return (
        <BottomTab.Navigator screenOptions={bottomTabStyles}>
            <BottomTab.Screen
                name={TalentBottomTabScreenName.MAIL}
                component={Mail}
                options={{
                    tabBarIcon: ({ color = '#FFFFFF' }) => (
                        <MaterialIcon
                            name={IconName.MAIL}
                            size={ICON_SIZE}
                            color={color}
                        />
                    ),
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
