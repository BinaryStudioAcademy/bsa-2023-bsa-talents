import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { Header } from '~/bundles/common/components/components';
import { DrawerScreenName } from '~/bundles/common/enums/enums';
import { type DrawerNavigationParameterList } from '~/bundles/common/types/types';
import { BsaBadges, Profile } from '~/bundles/users/screens/screens';

const Drawer = createDrawerNavigator<DrawerNavigationParameterList>();

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
                name={DrawerScreenName.PROFILE}
                component={Profile}
            />
            <Drawer.Screen
                name={DrawerScreenName.BSA_BADGES}
                component={BsaBadges}
            />
        </Drawer.Navigator>
    );
};

export { OnboardingNavigation };
