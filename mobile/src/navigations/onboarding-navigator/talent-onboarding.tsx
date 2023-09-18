import {
    createDrawerNavigator,
    type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';

import { Overlay } from '~/bundles/common/components/components';
import {
    DataStatus,
    TalentOnboardingScreenName,
} from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
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
    const { dataStatus } = useAppSelector(({ talents }) => talents);

    const isStepDataPending = dataStatus === DataStatus.PENDING;

    return (
        <>
            <Overlay isActive={isStepDataPending} />
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
        </>
    );
};

export { TalentOnboardingNavigator };
