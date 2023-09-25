import React from 'react';

import { createMaterialTopTabNavigator } from '~/bundles/common/helpers/helpers';
import { ProfileTabBar } from '~/bundles/talent/components/components';
import { ProfileDetailsScreenName } from '~/bundles/talent/enums/enums';
import {
    ProfileScreenBadges,
    ProfileScreenContacts,
    ProfileScreenHirings,
    ProfileScreenProfile,
    ProfileScreenSkills,
} from '~/bundles/talent/screens/screens';

const Tab = createMaterialTopTabNavigator();

const TalentProfileNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarItemStyle: { width: 100 },
            }}
            initialRouteName={ProfileDetailsScreenName.PROFILE}
            tabBar={(props): React.ReactNode => <ProfileTabBar {...props} />}
        >
            <Tab.Screen
                name={ProfileDetailsScreenName.PROFILE}
                component={ProfileScreenProfile}
            />
            <Tab.Screen
                name={ProfileDetailsScreenName.BADGES}
                component={ProfileScreenBadges}
            />
            <Tab.Screen
                name={ProfileDetailsScreenName.SKILLS}
                component={ProfileScreenSkills}
            />
            <Tab.Screen
                name={ProfileDetailsScreenName.CONTACTS}
                component={ProfileScreenContacts}
            />
            <Tab.Screen
                name={ProfileDetailsScreenName.HIRINGS}
                component={ProfileScreenHirings}
            />
        </Tab.Navigator>
    );
};

export { TalentProfileNavigator };
