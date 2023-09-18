import React from 'react';

import {
    TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
    TalentOnboardingScreenNumberByStep,
    TalentOnboardingStepState,
} from '~/bundles/common/enums/enums';
import { createDrawerNavigator } from '~/bundles/common/helpers/helpers';
import { useAppSelector, useCallback } from '~/bundles/common/hooks/hooks';
import {
    type DrawerContentComponentProps,
    type TalentOnboardingNavigationParameterList,
    type ValueOf,
} from '~/bundles/common/types/types';
import {
    BsaBadges,
    CVAndContacts,
    Preview,
    Profile,
    SkillsAndProjects,
} from '~/bundles/talent/screens/screens';

import { Header, Steps } from './components/components';

const Drawer = createDrawerNavigator<TalentOnboardingNavigationParameterList>();

const TalentOnboardingNavigator: React.FC = () => {
    const { completedStep } =
        useAppSelector(({ talents }) => talents.onboardingData) ?? {};
    const stepToActiveScreen = 1;
    const activeStepNumber = completedStep
        ? TalentOnboardingScreenNumberByStep[completedStep] + stepToActiveScreen
        : stepToActiveScreen;
    const getStepStatus = useCallback(
        (
            stepName: ValueOf<typeof TalentOnboardingScreenName>,
        ): ValueOf<typeof TalentOnboardingStepState> => {
            const stepNumber = TalentOnboardingScreenNumber[stepName];
            if (stepNumber === activeStepNumber) {
                return TalentOnboardingStepState.FOCUSED;
            }
            return stepNumber > activeStepNumber
                ? TalentOnboardingStepState.DISABLED
                : TalentOnboardingStepState.COMPLETED;
        },
        [activeStepNumber],
    );
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                header: ({ navigation }): React.ReactNode => (
                    <Header navigation={navigation} />
                ),
                drawerStyle: {
                    width: 330,
                },
            }}
            drawerContent={(
                props: DrawerContentComponentProps,
            ): React.ReactNode => <Steps {...props} />}
        >
            <Drawer.Screen
                name={TalentOnboardingScreenName.PROFILE}
                component={Profile}
                initialParams={{
                    stepState: getStepStatus(
                        TalentOnboardingScreenName.PROFILE,
                    ),
                }}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.BSA_BADGES}
                component={BsaBadges}
                initialParams={{
                    stepState: getStepStatus(
                        TalentOnboardingScreenName.BSA_BADGES,
                    ),
                }}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.SKILLS_AND_PROJECTS}
                component={SkillsAndProjects}
                initialParams={{
                    stepState: getStepStatus(
                        TalentOnboardingScreenName.SKILLS_AND_PROJECTS,
                    ),
                }}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.CV_AND_CONTACTS}
                component={CVAndContacts}
                initialParams={{
                    stepState: getStepStatus(
                        TalentOnboardingScreenName.CV_AND_CONTACTS,
                    ),
                }}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.PREVIEW}
                component={Preview}
                initialParams={{
                    stepState: getStepStatus(
                        TalentOnboardingScreenName.PREVIEW,
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export { TalentOnboardingNavigator };
