import React from 'react';

import { View } from '~/bundles/common/components/components';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EmployerOnboardingForm } from '~/bundles/employer/components/components';

const EmployerOnboarding: React.FC = () => {
    const handleEmployerDataSubmit = useCallback(() => {
        // TODO: handle sign in
    }, []);

    return (
        <View style={globalStyles.flex1}>
            <EmployerOnboardingForm onSubmit={handleEmployerDataSubmit} />
        </View>
    );
};

export { EmployerOnboarding };
