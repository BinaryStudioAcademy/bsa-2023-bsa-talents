import React from 'react';

import { TalentOnboardingScreenName } from '~/bundles/common/enums/enums';
import { createDrawerNavigator } from '~/bundles/common/helpers/helpers';
import {
    useAppSelector,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks';
import {
    type DrawerContentComponentProps,
    type TalentOnboardingNavigationParameterList,
} from '~/bundles/common/types/types';
import {
    BsaBadges,
    CVAndContacts,
    Preview,
    Profile,
    SkillsAndProjects,
} from '~/bundles/talent/screens/screens';
import { getNextStep } from '~/helpers/helpers';

import { Header, Steps } from './components/components';

const Drawer = createDrawerNavigator<TalentOnboardingNavigationParameterList>();

const TalentOnboardingNavigator: React.FC = () => {
    const { onboardingData } = useAppSelector(({ common }) => common);
    const [nextStep, setNextStep] = useState<
        keyof TalentOnboardingNavigationParameterList | undefined
    >();

    useEffect(() => {
        if (onboardingData?.completedStep) {
            const calculatedNextStep = getNextStep(
                onboardingData.completedStep,
            );

            setNextStep(
                calculatedNextStep as keyof TalentOnboardingNavigationParameterList,
            );
        }
    }, [onboardingData?.completedStep, onboardingData]);

    return (
        <Drawer.Navigator
            initialRouteName={nextStep}
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
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.BSA_BADGES}
                component={BsaBadges}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.SKILLS_AND_PROJECTS}
                component={SkillsAndProjects}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.CV_AND_CONTACTS}
                component={CVAndContacts}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.PREVIEW}
                component={Preview}
            />
        </Drawer.Navigator>
    );
};

export { TalentOnboardingNavigator };
