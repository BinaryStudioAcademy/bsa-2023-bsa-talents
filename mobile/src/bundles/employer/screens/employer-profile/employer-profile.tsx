import React from 'react';

import { ScrollView, Text } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EmployerOnboardingForm } from '~/bundles/employer/components/components';

import { styles } from './styles';

const EmployerProfile: React.FC = () => {
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
            <Text category={TextCategory.H4} style={globalStyles.pb20}>
                My profile
            </Text>
            <EmployerOnboardingForm
                employerOnboardingData={null}
                onSubmit={handleEmployerDataSubmit}
            />
        </ScrollView>
    );
};

export { EmployerProfile };
