import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { OnboardingScreenName } from '~/bundles/common/enums/enums';
import { type OnboardingNavigationParameterList } from '~/bundles/common/types/types';
import { BsaBadges, Profile } from '~/bundles/users/screens/screens';

import { Header } from './components/components';

const Drawer = createDrawerNavigator<OnboardingNavigationParameterList>();

const OnboardingNavigation: React.FC = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                header: ({ navigation }): React.ReactNode => (
                    <Header navigation={navigation} />
                ),
            }}
        >
            <Drawer.Screen
                name={OnboardingScreenName.PROFILE}
                component={Profile}
            />
            <Drawer.Screen
                name={OnboardingScreenName.BSA_BADGES}
                component={BsaBadges}
            />
        </Drawer.Navigator>
    );
};

export { OnboardingNavigation };
