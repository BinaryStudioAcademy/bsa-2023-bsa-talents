import React from 'react';

import { ScrollView, Text } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EmployerOnboardingForm } from '~/bundles/employer/components/components';

import { LabelForButtonEmployerProfile } from '../../enums/enums';
import { styles } from './styles';

const EmployerOnboarding: React.FC = () => {
    const handleEmployerDataSubmit = useCallback(() => {
        // TODO: handle employer onboarding
    }, []);

    return (
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
                Please, fill out all the fields below, so we could verify your
                company
            </Text>
            <EmployerOnboardingForm
                labelForSubmitButton={
                    LabelForButtonEmployerProfile.SUBMIT_VERIFICATION
                }
                employerOnboardingData={null}
                onSubmit={handleEmployerDataSubmit}
            />
        </ScrollView>
    );
};

export { EmployerOnboarding };
