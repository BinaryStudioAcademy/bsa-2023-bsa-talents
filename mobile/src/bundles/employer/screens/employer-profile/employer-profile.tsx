import React from 'react';

import {
    Loader,
    LogoutButton,
    ScrollView,
    StatusBar,
    Text,
    VerificationMessage,
    View,
} from '~/bundles/common/components/components';
import { Color, DataStatus, TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EmployerOnboardingForm } from '~/bundles/employer/components/components';
import { useEmployerFormSubmit } from '~/bundles/employer/hooks/hooks';
import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';

import { styles } from './styles';

const EmployerProfile: React.FC = () => {
    const { onboardingData, dataStatus } = useAppSelector(
        ({ common }) => common,
    );
    const isDataLoading = dataStatus === DataStatus.PENDING;

    const { isApproved } = onboardingData ?? {};

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
                  photoUrl: onboardingData.photoUrl ?? '',
                  companyLogoUrl: onboardingData.companyLogoUrl ?? ',',
              }
            : null;

    const handleSubmit = useEmployerFormSubmit();

    const handleEmployerDataSubmit = (
        payload: EmployerOnboardingFormDto,
    ): void => {
        void handleSubmit(payload);
    };

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <View
                style={[
                    globalStyles.p25,
                    globalStyles.pr10,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.header,
                ]}
            >
                <Text category={TextCategory.H3}>My profile</Text>
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentFlexEnd,
                        globalStyles.alignItemsCenter,
                    ]}
                >
                    {!isApproved && onboardingData && <VerificationMessage />}
                    <LogoutButton />
                </View>
            </View>
            {isDataLoading ? (
                <Loader />
            ) : (
                <ScrollView
                    contentContainerStyle={[
                        styles.container,
                        globalStyles.defaultScreenPadding,
                    ]}
                >
                    <EmployerOnboardingForm
                        employerOnboardingData={employerOnboardingData}
                        onSubmit={handleEmployerDataSubmit}
                    />
                </ScrollView>
            )}
        </>
    );
};

export { EmployerProfile };
