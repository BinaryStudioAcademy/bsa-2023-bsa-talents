import React from 'react';

import { ChatList } from '~/bundles/chat/screens/screens';
import { MaterialIcon } from '~/bundles/common/components/components';
import {
    EmployerBottomTabScreenName,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';
import { createBottomTabNavigator } from '~/bundles/common/helpers/helpers';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { type EmployerBottomTabNavigationParameterList } from '~/bundles/common/types/types';
import {
    CandidateDetails,
    Candidates,
    EmployerProfile,
} from '~/bundles/employer/screens/screens';
import { notifications } from '~/framework/notifications/notifications';

import { bottomTabStyles } from '../styles';

const BottomTab =
    createBottomTabNavigator<EmployerBottomTabNavigationParameterList>();

const EmployerBottomTabNavigator: React.FC = () => {
    const { isApproved } =
        useAppSelector(({ common }) => common.onboardingData) ?? {};

    return (
        <BottomTab.Navigator
            screenOptions={bottomTabStyles}
            initialRouteName={EmployerBottomTabScreenName.EMPLOYER_PROFILE}
        >
            <BottomTab.Screen
                name={EmployerBottomTabScreenName.CANDIDATES}
                component={Candidates}
                options={{
                    tabBarIcon: ({ color = '#FFFFFF' }) => (
                        <MaterialIcon
                            name={IconName.FOLDER_SHARED}
                            size={IconSize.GENERAL}
                            color={color}
                        />
                    ),
                }}
                listeners={{
                    tabPress: (event): void => {
                        if (!isApproved) {
                            notifications.showError({
                                title: 'You are not verified to see other pages',
                            });
                            event.preventDefault();
                        }
                    },
                }}
            />
            <BottomTab.Screen
                name={EmployerBottomTabScreenName.CHAT_LIST}
                component={ChatList}
                options={{
                    tabBarIcon: ({ color = '#FFFFFF' }) => (
                        <MaterialIcon
                            name={IconName.MAIL}
                            size={IconSize.GENERAL}
                            color={color}
                        />
                    ),
                }}
                listeners={{
                    tabPress: (event): void => {
                        if (!isApproved) {
                            notifications.showError({
                                title: 'You are not verified to see other pages',
                            });
                            event.preventDefault();
                        }
                    },
                }}
            />
            <BottomTab.Screen
                name={EmployerBottomTabScreenName.EMPLOYER_PROFILE}
                component={EmployerProfile}
                options={{
                    tabBarIcon: ({ color = '#FFFFFF' }) => (
                        <MaterialIcon
                            name={IconName.PERSON}
                            size={IconSize.GENERAL}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name={EmployerBottomTabScreenName.CANDIDATE_DETAILS}
                component={CandidateDetails}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </BottomTab.Navigator>
    );
};

export { EmployerBottomTabNavigator };
