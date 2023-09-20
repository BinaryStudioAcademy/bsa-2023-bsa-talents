import React from 'react';

import { ChatList } from '~/bundles/chat/screens/screens';
import { MaterialIcon } from '~/bundles/common/components/components';
import {
    EmployerBottomTabScreenName,
    IconName,
} from '~/bundles/common/enums/enums';
import { createBottomTabNavigator } from '~/bundles/common/helpers/helpers';
import { type EmployerBottomTabNavigationParameterList } from '~/bundles/common/types/types';
import {
    Candidates,
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
                        <MaterialIcon
                            name={IconName.FOLDER_SHARED}
                            size={iconSize}
                            color={color}
                        />
                    ),
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
