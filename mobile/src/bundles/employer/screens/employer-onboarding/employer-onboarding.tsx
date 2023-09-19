import React from 'react';

import { View } from '~/bundles/common/components/components';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EmployerOnboardingForm } from '~/bundles/employer/components/components';

const EmployerOnboarding: React.FC = () => {
    const handleEmployerDataSubmit = useCallback(() => {
        // TODO: handle employer onboarding
    }, []);

    return (
        <View style={globalStyles.flex1}>
            <EmployerOnboardingForm
                employerOnboardingData={null}
                onSubmit={handleEmployerDataSubmit}
            />
        </View>
    );
};

export { EmployerOnboarding };