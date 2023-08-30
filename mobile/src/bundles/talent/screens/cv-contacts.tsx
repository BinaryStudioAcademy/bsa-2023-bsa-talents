import React from 'react';

import { View } from '~/bundles/common/components/components';
import {
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import { useAppRoute, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    NewAccountHeader,
    ProfileForm,
} from '~/bundles/talent/components/components';

const CVContacts: React.FC = () => {
    const { name } = useAppRoute();
    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleProfileSubmit = useCallback(() => {
        // TODO: add submit logic
        return null;
    }, []);

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <ProfileForm onSubmit={handleProfileSubmit} />
        </View>
    );
};

export { CVContacts };
