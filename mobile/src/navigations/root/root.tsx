import {
    createNativeStackNavigator,
    type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { RootScreenName } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import {
    type RootNavigationParameterList,
    type ValueOf,
} from '~/bundles/common/types/types';
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

type Properties = {
    isSignedIn?: boolean;
    isProfileComplete?: boolean;
    // TODO: update when enum is in shared folder
    role?: ValueOf<typeof UserRole>;
};

const Root: React.FC<Properties> = ({ isProfileComplete = false }) => {
    const { isSignedIn, role } = useAppSelector(({ auth }) => ({
        isSignedIn: auth.isSignedIn,
        role: auth.userData.role,
    }));
    // prettier-ignore
    return (
        <RootStack.Navigator screenOptions={screenOptions}>
            {isSignedIn ? (
                <RootStack.Screen
                    name={RootScreenName.MAIN_ROOT_ROUTE}
                    component={role === UserRole.TALENT ? TalentBottomTabNavigator : EmployerBottomTabNavigator}
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
