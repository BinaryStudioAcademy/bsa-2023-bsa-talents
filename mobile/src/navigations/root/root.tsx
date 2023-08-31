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

const renderStackScreen = ({
    isSignedIn,
    isProfileComplete,
    role,
}: Properties): React.JSX.Element => {
    if (isSignedIn) {
        return (
            <RootStack.Screen
                name={RootScreenName.MAIN_ROOT_ROUTE}
                component={
                    role === 'talent'
                        ? TalentBottomTabNavigator
                        : EmployerBottomTabNavigator
                }
            />
        );
    }

    if (isProfileComplete) {
        return (
            <RootStack.Screen
                name={RootScreenName.ONBOARDING_ROOT_ROUTE}
                // TODO: create EmployerOnboardingNavigator for role == 'employer'
                component={TalentOnboardingNavigator}
            />
        );
    }

    return (
        <RootStack.Screen
            name={RootScreenName.AUTH_ROOT_ROUTE}
            component={AuthNavigator}
        />
    );
};

const Root: React.FC<Properties> = ({
    isSignedIn = false,
    isProfileComplete = true,
    role = 'talent',
}) => {
    return (
        <RootStack.Navigator screenOptions={screenOptions}>
            {renderStackScreen({ isSignedIn, isProfileComplete, role })}
        </RootStack.Navigator>
    );
};

export { Root };
