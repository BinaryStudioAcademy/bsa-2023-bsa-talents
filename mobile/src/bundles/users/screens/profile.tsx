import React from 'react';

import { View } from '~/bundles/common/components/components';
import {
    Color,
    type OnboardingScreenName,
    OnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import { useAppRoute, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';

import { NewAccountHeader, ProfileForm } from '../components/components';

const Profile: React.FC = () => {
    const { name } = useAppRoute();
    const stepTitle = name as ValueOf<typeof OnboardingScreenName>;
    const stepNumber = OnboardingScreenNumber[stepTitle];

    const handleProfileSubmit = useCallback(() => {
        // TODO: add submit logic
        return null;
    }, []);

    return (
        <View style={[globalStyles.flex1, { backgroundColor: Color.TEXT }]}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <ProfileForm onSubmit={handleProfileSubmit} />
        </View>
    );
};

export { Profile };
