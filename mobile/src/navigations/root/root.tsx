import React from 'react';

import { UserRole } from '~/bundles/auth/enums/enums';
import { loadCurrentUser } from '~/bundles/auth/store/actions';
import {
    createNativeStackNavigator,
    Loader,
} from '~/bundles/common/components/components';
import {
    CompletedTalentOnboardingStep,
    DataStatus,
    RootScreenName,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import {
    type NativeStackNavigationOptions,
    type RootNavigationParameterList,
} from '~/bundles/common/types/types';
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

    //TODO use when backend is ready
    // useEffect(() => {
    //     const payload: UserDetailsFindRequestDto = {
    //         userId: currentUserData?.id,
    //     };
    //     void dispatch(talentActions.getTalentDetails(payload));
    // }, [currentUserData?.id, dispatch]);

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
                // component={TalentOnboardingNavigator}
                component={
                    role === UserRole.TALENT
                        ? TalentOnboardingNavigator
                        : EmployerBottomTabNavigator
                }
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
