import React from 'react';

import { loadCurrentUser } from '~/bundles/auth/store/actions';
import { Chat } from '~/bundles/chat/screens/screens';
import { Loader } from '~/bundles/common/components/components';
import {
    CompletedTalentOnboardingStep,
    DataStatus,
    RootScreenName,
    UserRole,
} from '~/bundles/common/enums/enums';
import { createNativeStackNavigator } from '~/bundles/common/helpers/helpers';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { getUserDetails } from '~/bundles/common/store/actions';
import {
    type NativeStackNavigationOptions,
    type RootNavigationParameterList,
} from '~/bundles/common/types/types';
import { EmployerOnboarding } from '~/bundles/employer/screens/screens';
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
    const { isSignedIn, dataStatus, currentUserData } = useAppSelector(
        ({ auth }) => auth,
    );
    const { onboardingData } = useAppSelector(({ common }) => common);
    const { role } = currentUserData ?? {};
    const isPendingAuth = dataStatus === DataStatus.CHECK_TOKEN;
    const dispatch = useAppDispatch();

    //TODO change to onboardingData?.isApprove
    const isProfileComplete =
        onboardingData?.completedStep ===
            CompletedTalentOnboardingStep.Preview ||
        onboardingData?.companyName;

    useEffect(() => {
        void dispatch(loadCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (!currentUserData) {
            return;
        }
        void dispatch(getUserDetails({ userId: currentUserData.id }));
    }, [currentUserData, currentUserData?.id, dispatch]);

    if (isPendingAuth) {
        return <Loader />;
    }

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
                component={
                    role === UserRole.TALENT
                        ? TalentOnboardingNavigator
                        : EmployerOnboarding
                }
            />
        ),
        main: (
            <>
                <RootStack.Screen
                    name={RootScreenName.MAIN_ROOT_ROUTE}
                    component={
                        role === UserRole.TALENT
                            ? TalentBottomTabNavigator
                            : EmployerBottomTabNavigator
                    }
                />
                <RootStack.Screen name={RootScreenName.CHAT} component={Chat} />
            </>
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
