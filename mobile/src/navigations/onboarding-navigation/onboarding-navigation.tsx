import {
    createDrawerNavigator,
    type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';

import { OnboardingScreenName } from '~/bundles/common/enums/enums';
import { type OnboardingNavigationParameterList } from '~/bundles/common/types/types';
import {
    BsaBadges,
    CvAndContacts,
    Preview,
    Profile,
    SkillsAndProjects,
} from '~/bundles/users/screens/screens';

import { Header, Steps } from './components/components';

const Drawer = createDrawerNavigator<OnboardingNavigationParameterList>();

const OnboardingNavigation: React.FC = () => {
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
                name={OnboardingScreenName.PROFILE}
                component={Profile}
            />
            <Drawer.Screen
                name={OnboardingScreenName.BSA_BADGES}
                component={BsaBadges}
            />
            <Drawer.Screen
                name={OnboardingScreenName.SKILLS_AND_PROJECTS}
                component={SkillsAndProjects}
            />
            <Drawer.Screen
                name={OnboardingScreenName.CV_AND_CONTACTS}
                component={CvAndContacts}
            />
            <Drawer.Screen
                name={OnboardingScreenName.PREVIEW}
                component={Preview}
            />
        </Drawer.Navigator>
    );
};

export { OnboardingNavigation };
