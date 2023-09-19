import React from 'react';

import { loadCurrentUser } from '~/bundles/auth/store/actions';
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
import {
    type NativeStackNavigationOptions,
    type RootNavigationParameterList,
} from '~/bundles/common/types/types';
import { getTalentDetails } from '~/bundles/talent/store/actions';
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
    const { completedStep } =
        useAppSelector(({ talents }) => talents.onboardingData) ?? {};
    const { role } = currentUserData ?? {};
    const dispatch = useAppDispatch();

    const isProfileComplete =
        completedStep === CompletedTalentOnboardingStep.Preview;

    useEffect(() => {
        void dispatch(loadCurrentUser());
    }, [dispatch]);

    const isPendingAuth = dataStatus === DataStatus.CHECK_TOKEN;

    useEffect(() => {
        if (!currentUserData) {
            return;
        }
        void dispatch(getTalentDetails({ userId: currentUserData.id }));
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
            //TODO redirect to next after completedStep screen
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
