import {
    createNativeStackNavigator,
    type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { RootScreenName } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { type RootNavigationParameterList } from '~/bundles/common/types/types';
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

type Properties = {
    isSignedIn?: boolean;
    isProfileComplete?: boolean;
    // TODO: update when enum is in shared folder
    role?: 'talent' | 'employer';
};

const Root: React.FC<Properties> = ({
    // isSignedIn = false,
    isProfileComplete = false,
    // role = 'talent',
}) => {
    const { token, role: userRole } = useAppSelector(({ auth }) => ({
        token: auth.user?.token,
        role: auth.user?.role,
    }));
    // prettier-ignore
    return (
        <RootStack.Navigator screenOptions={screenOptions}>
            {token ? (
                <RootStack.Screen
                    name={RootScreenName.MAIN_ROOT_ROUTE}
                    component={userRole === 'talent' ? TalentBottomTabNavigator : EmployerBottomTabNavigator}
                />
            ) : (isProfileComplete ? (
                <RootStack.Screen
                    name={RootScreenName.ONBOARDING_ROOT_ROUTE}
                    // TODO: create EmployerOnboardingNavigator for role == 'employer'
                    component={TalentOnboardingNavigator}
                />
            ) : (
                <RootStack.Screen
                    name={RootScreenName.AUTH_ROOT_ROUTE}
                    component={AuthNavigator}
                />
            ))}
        </RootStack.Navigator>
    );
};

export { Root };
