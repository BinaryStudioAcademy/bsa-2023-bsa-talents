import {
    createNativeStackNavigator,
    type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { RootScreenName } from '~/bundles/common/enums/enums';
import { type RootNavigationParameterList } from '~/bundles/common/types/types';
import { AuthNavigator } from '~/navigations/auth-navigator/auth-navigator';
import {
    EmployerBottomTabNavigator,
    TalentBottomTabNavigator,
} from '~/navigations/bottom-tab-navigator/bottom-tab-navigator';
import {
    EmployerOnboardingNavigator,
    TalentOnboardingNavigator,
} from '~/navigations/onboarding-navigator/onboarding-navigator';

const RootStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

type Properties = {
    isSignedIn?: boolean;
    isProfileComplete?: boolean;
    role?: 'talent' | 'employer';
};

const Root: React.FC<Properties> = ({
    isSignedIn = false,
    isProfileComplete = false,
    role = 'talent',
}) => {
    // prettier-ignore
    return (
        <RootStack.Navigator screenOptions={screenOptions}>
            {isSignedIn ? (
                <RootStack.Screen
                    name={RootScreenName.MAIN_ROOT_ROUTE}
                    component={role === 'talent' ? TalentBottomTabNavigator : EmployerBottomTabNavigator}
                />
            ) : (isProfileComplete ? (
                <RootStack.Screen
                    name={RootScreenName.ONBOARDING_ROOT_ROUTE}
                    component={role === 'talent' ? TalentOnboardingNavigator : EmployerOnboardingNavigator}
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
