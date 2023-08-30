import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { TalentOnboardingScreenName } from '~/bundles/common/enums/enums';
import { type TalentOnboardingNavigationParameterList } from '~/bundles/common/types/types';
import {
    BsaBadges,
    CVContacts,
    Profile,
} from '~/bundles/talent/screens/screens';

import { Header } from './components/components';

const Drawer = createDrawerNavigator<TalentOnboardingNavigationParameterList>();

const TalentOnboardingNavigator: React.FC = () => {
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
                name={TalentOnboardingScreenName.PROFILE}
                component={Profile}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.BSA_BADGES}
                component={BsaBadges}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.CV_CONTACTS}
                component={CVContacts}
            />
        </Drawer.Navigator>
    );
};

export { TalentOnboardingNavigator };
