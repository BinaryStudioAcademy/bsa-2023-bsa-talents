import React from 'react';

import {
    Text,
    VerificationMessage,
} from '~/bundles/common/components/components';

const EmployerProfile: React.FC = () => {
    return (
        <>
            <VerificationMessage isApproved={false} />
            <Text>Employer Profile screen</Text>
        </>
    );
};

export { EmployerProfile };
