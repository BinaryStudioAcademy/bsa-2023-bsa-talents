import React from 'react';

import {
    Text,
    VerificationMessage,
} from '~/bundles/common/components/components';
import { useAppSelector } from '~/bundles/common/hooks/hooks';

const TalentProfile: React.FC = () => {
    //todo change to real data
    const { isApproved } = useAppSelector(({ talents }) => talents);

    return (
        <>
            <Text>Talent Profile screen</Text>
            <VerificationMessage isApproved={isApproved} />
        </>
    );
};

export { TalentProfile };
