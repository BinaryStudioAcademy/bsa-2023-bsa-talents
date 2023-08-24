import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { Auth } from '~/bundles/auth/screens/auth';
import { Header } from '~/bundles/common/components/components';
import { RootScreenName } from '~/bundles/common/enums/enums';

const Drawer = createDrawerNavigator();

const OnboardingNavigation: React.FC = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                header: ({ navigation }): React.ReactNode => {
                    return <Header navigation={navigation} />;
                },
            }}
        >
            <Drawer.Screen name={RootScreenName.SIGN_UP} component={Auth} />
            <Drawer.Screen name={RootScreenName.SIGN_IN} component={Auth} />
        </Drawer.Navigator>
    );
};

export { OnboardingNavigation };
