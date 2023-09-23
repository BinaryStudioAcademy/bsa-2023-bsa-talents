import React from 'react';

import {
    Text,
    VerificationMessage,
} from '~/bundles/common/components/components';
import { useAppSelector } from '~/bundles/common/hooks/hooks';

const EmployerProfile: React.FC = () => {
    const { isApproved } =
        useAppSelector(({ talents }) => talents.onboardingData) ?? {};

    return (
        <>
            <Text>Employer Profile screen</Text>
            {!isApproved && <VerificationMessage />}
        </>
    );
};

export { EmployerProfile };
