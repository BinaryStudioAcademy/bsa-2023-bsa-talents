import {
    createDrawerNavigator,
    type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';

import {
    TalentOnboardingScreenName,
    TalentOnboardingStepState,
} from '~/bundles/common/enums/enums';
import { type TalentOnboardingNavigationParameterList } from '~/bundles/common/types/types';
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
                    stepState: TalentOnboardingStepState.FOCUSED,
                }}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.BSA_BADGES}
                component={BsaBadges}
                initialParams={{
                    stepState: TalentOnboardingStepState.FOCUSED,
                }}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.SKILLS_AND_PROJECTS}
                component={SkillsAndProjects}
                initialParams={{
                    stepState: TalentOnboardingStepState.FOCUSED,
                }}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.CV_AND_CONTACTS}
                component={CVAndContacts}
                initialParams={{
                    stepState: TalentOnboardingStepState.COMPLETED,
                }}
            />
            <Drawer.Screen
                name={TalentOnboardingScreenName.PREVIEW}
                component={Preview}
                initialParams={{
                    stepState: TalentOnboardingStepState.FOCUSED,
                }}
            />
        </Drawer.Navigator>
    );
};

export { TalentOnboardingNavigator };
