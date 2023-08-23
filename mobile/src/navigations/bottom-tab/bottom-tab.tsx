import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { AuthScreenName } from '~/bundles/common/enums/enums';
import { type AuthNavigationParameterList } from '~/bundles/common/types/types';
import { Mail, Person, SharedFolder } from '~/bundles/users/screens/screens';

import { bottomTabStyles } from './styles';

const Tab = createBottomTabNavigator<AuthNavigationParameterList>();

const BottomTab: React.FC = () => {
    return (
        <Tab.Navigator screenOptions={bottomTabStyles}>
            <Tab.Screen
                name={AuthScreenName.SHARED_FOLDER}
                component={SharedFolder}
            />
            <Tab.Screen name={AuthScreenName.MAIL} component={Mail} />
            <Tab.Screen name={AuthScreenName.PERSON} component={Person} />
        </Tab.Navigator>
    );
};

export { BottomTab };
