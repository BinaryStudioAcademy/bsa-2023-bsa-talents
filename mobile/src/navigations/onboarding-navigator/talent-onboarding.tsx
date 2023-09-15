import {
    createDrawerNavigator,
    type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';

import { Overlay } from '~/bundles/common/components/components';
import {
    DataStatus,
    TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
    TalentOnboardingScreenNumberByStep,
    TalentOnboardingStepState,
} from '~/bundles/common/enums/enums';
import { useAppSelector, useCallback } from '~/bundles/common/hooks/hooks';
import {
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
    const { dataStatus, onboardingData } = useAppSelector(
        ({ talents }) => talents,
    );

    const { completedStep } = onboardingData ?? {};

    const isPendingAuth = dataStatus === DataStatus.PENDING;

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
        <>
            <Overlay isActive={isPendingAuth} />
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
        </>
    );
};

export { TalentOnboardingNavigator };
