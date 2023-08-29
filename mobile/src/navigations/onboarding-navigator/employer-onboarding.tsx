import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { EmployerOnboardingScreenName } from '~/bundles/common/enums/enums';
import { type EmployerOnboardingNavigationParameterList } from '~/bundles/common/types/types';
import { Step1 } from '~/bundles/employer/screens/screens';

import { Header } from './components/components';

const Drawer =
    createDrawerNavigator<EmployerOnboardingNavigationParameterList>();

const EmployerOnboardingNavigator: React.FC = () => {
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
                name={EmployerOnboardingScreenName.STEP1}
                component={Step1}
            />
        </Drawer.Navigator>
    );
};

export { EmployerOnboardingNavigator };
