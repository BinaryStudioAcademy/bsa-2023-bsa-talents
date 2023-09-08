import {
    createNativeStackNavigator,
    type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { RootScreenName } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { type RootNavigationParameterList } from '~/bundles/common/types/types';
import { UserRole } from '~/bundles/users/enums/enums';
import { AuthNavigator } from '~/navigations/auth-navigator/auth-navigator';
import {
    EmployerBottomTabNavigator,
    TalentBottomTabNavigator,
} from '~/navigations/bottom-tab-navigator/bottom-tab-navigator';
import { TalentOnboardingNavigator } from '~/navigations/onboarding-navigator/onboarding-navigator';

const RootStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

const Root: React.FC = () => {
    const { isSignedIn, currentUser } = useAppSelector(({ auth }) => auth);
    const { isProfileComplete, role } = currentUser ?? {};

    const navigators = {
        auth: (
            <RootStack.Screen
                name={RootScreenName.AUTH_ROOT_ROUTE}
                component={AuthNavigator}
            />
        ),
        onboarding: (
            <RootStack.Screen
                name={RootScreenName.ONBOARDING_ROOT_ROUTE}
                // TODO: create EmployerOnboardingNavigator for role == 'employer'
                component={TalentOnboardingNavigator}
            />
        ),
        main: (
            <RootStack.Screen
                name={RootScreenName.MAIN_ROOT_ROUTE}
                component={
                    role === UserRole.TALENT
                        ? TalentBottomTabNavigator
                        : EmployerBottomTabNavigator
                }
            />
        ),
    };

    const renderStackScreen = (): React.JSX.Element => {
        if (isSignedIn && isProfileComplete) {
            return navigators.main;
        }
        if (isSignedIn && !isProfileComplete) {
            return navigators.onboarding;
        }
        return navigators.auth;
    };

    return (
        <RootStack.Navigator screenOptions={screenOptions}>
            {renderStackScreen()}
        </RootStack.Navigator>
    );
};

export { Root };
