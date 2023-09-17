import React from 'react';

import {
    createBottomTabNavigator,
    Icon,
} from '~/bundles/common/components/components';
import {
    EmployerBottomTabScreenName,
    IconName,
} from '~/bundles/common/enums/enums';
import { type EmployerBottomTabNavigationParameterList } from '~/bundles/common/types/types';
import {
    Candidates,
    Chat,
    EmployerProfile,
} from '~/bundles/employer/screens/screens';

import { bottomTabStyles } from '../styles';

const BottomTab =
    createBottomTabNavigator<EmployerBottomTabNavigationParameterList>();

const iconSize = 24;

const EmployerBottomTabNavigator: React.FC = () => {
    return (
        <BottomTab.Navigator screenOptions={bottomTabStyles}>
            <BottomTab.Screen
                name={EmployerBottomTabScreenName.CANDIDATES}
                component={Candidates}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name={IconName.FOLDER_SHARED}
                            size={iconSize}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name={EmployerBottomTabScreenName.CHAT}
                component={Chat}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name={IconName.MAIL}
                            size={iconSize}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name={EmployerBottomTabScreenName.EMPLOYER_PROFILE}
                component={EmployerProfile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
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
