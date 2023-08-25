import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { Header } from '~/bundles/common/components/components';
import { DrawerScreenName } from '~/bundles/common/enums/enums';
import { type DrawerNavigationParameterList } from '~/bundles/common/types/types';
import { StepOne, StepTwo } from '~/bundles/users/screens/screens';

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
                name={DrawerScreenName.STEP_ONE}
                component={StepOne}
            />
            <Drawer.Screen
                name={DrawerScreenName.STEP_TWO}
                component={StepTwo}
            />
        </Drawer.Navigator>
    );
};

export { OnboardingNavigation };
