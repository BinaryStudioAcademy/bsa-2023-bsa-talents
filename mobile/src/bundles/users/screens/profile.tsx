import React from 'react';

import { View } from '~/bundles/common/components/components';
import { type AccountSteps } from '~/bundles/common/enums/enums';
import { useAppRoute, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { NewAccountHeader, ProfileForm } from '../components/components';

const Profile: React.FC = () => {
    const { name } = useAppRoute();
    const stepTitle = name as (typeof AccountSteps)[keyof typeof AccountSteps];

    const handleProfileSubmit = useCallback(() => {
        return null;
    }, []);

    return (
        <View
            style={[
                globalStyles.flex1,
                globalStyles.borderRadius9,
                { backgroundColor: '#FFFFFF' },
            ]}
        >
            <NewAccountHeader title={stepTitle} currentStep={1} />
            <ProfileForm onSubmit={handleProfileSubmit} />
        </View>
    );
};

export { Profile };
