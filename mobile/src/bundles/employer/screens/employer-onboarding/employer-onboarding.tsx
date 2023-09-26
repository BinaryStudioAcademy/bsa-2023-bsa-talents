import React from 'react';

import { logout } from '~/bundles/auth/store/actions';
import {
    CommunityIcon,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EmployerOnboardingForm } from '~/bundles/employer/components/components';
import { useEmployerFormSubmit } from '~/bundles/employer/hooks/hooks';
import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';

import { styles } from './styles';

const EmployerOnboarding: React.FC = () => {
    const dispatch = useAppDispatch();
    const { onboardingData } = useAppSelector(({ common }) => common);

    const employerOnboardingData: EmployerOnboardingFormDto | null =
        onboardingData
            ? {
                  photo: onboardingData.photo ?? null,
                  companyLogo: onboardingData.companyLogo ?? null,
                  fullName: onboardingData.fullName ?? '',
                  employerPosition: onboardingData.employerPosition ?? '',
                  linkedinLink: onboardingData.linkedinLink ?? '',
                  companyName: onboardingData.companyName ?? '',
                  companyWebsite: onboardingData.companyWebsite ?? '',
                  location: onboardingData.location ?? '',
                  description: onboardingData.description ?? '',
              }
            : null;

    const handleSubmit = useEmployerFormSubmit();

    const handleEmployerDataSubmit = (
        payload: EmployerOnboardingFormDto,
    ): void => {
        void handleSubmit(payload);
    };

    const handleLogout = (): void => {
        void dispatch(logout());
    };

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <ScrollView
                contentContainerStyle={[
                    globalStyles.defaultScreenPadding,
                    styles.container,
                ]}
            >
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentSpaceBetween,
                        globalStyles.alignItemsFlexEnd,
                        globalStyles.mb15,
                    ]}
                >
                    <Text category={TextCategory.H4} style={[styles.title]}>
                        Create a profile to find a perfect match to your company
                    </Text>
                    <Pressable onPress={handleLogout}>
                        <CommunityIcon
                            name={IconName.LOGOUT}
                            size={30}
                            color={Color.TEXT2}
                        />
                    </Pressable>
                </View>
                <Text category={TextCategory.H6} style={globalStyles.mb10}>
                    Please, fill out all the fields below, so we could verify
                    your company
                </Text>
                <EmployerOnboardingForm
                    employerOnboardingData={employerOnboardingData}
                    onSubmit={handleEmployerDataSubmit}
                />
            </ScrollView>
        </>
    );
};

export { EmployerOnboarding };
