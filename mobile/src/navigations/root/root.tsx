import {
    createNativeStackNavigator,
    type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { RootScreenName } from '~/bundles/common/enums/enums';
import { type RootNavigationParameterList } from '~/bundles/common/types/types';

import { AuthNavigator } from '../auth-navigator/auth-navigator';
import { MainBottomTabNavigator } from '../main-bottom-tab/main-bottom-tab';
import { OnboardingNavigation } from '../onboarding-navigation/onboarding-navigation';

const RootStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

type Properties = {
    isSignedIn?: boolean;
    isProfileComplete?: boolean;
};

const Root: React.FC<Properties> = ({
    isSignedIn = false,
    isProfileComplete = false,
}) => {
    // prettier-ignore
    return (
        <RootStack.Navigator screenOptions={screenOptions}>
            {isSignedIn ? (
                <RootStack.Screen
                    name={RootScreenName.MAIN_ROOT_ROUTE}
                    component={MainBottomTabNavigator}
                />
            ) : (isProfileComplete ? (
                <RootStack.Screen
                    name={RootScreenName.ONBOARDING_ROOT_ROUTE}
                    component={OnboardingNavigation}
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
