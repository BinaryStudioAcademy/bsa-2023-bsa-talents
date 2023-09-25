import React from 'react';

import {
    ScrollView,
    StatusBar,
    Text,
} from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EmployerOnboardingForm } from '~/bundles/employer/components/components';
import { useEmployerFormSubmit } from '~/bundles/employer/hooks/hooks';
import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';

import { styles } from './styles';

const EmployerOnboarding: React.FC = () => {
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
                <Text
                    category={TextCategory.H4}
                    style={[globalStyles.mb15, styles.title]}
                >
                    Create a profile to find a perfect match to your company
                </Text>
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
