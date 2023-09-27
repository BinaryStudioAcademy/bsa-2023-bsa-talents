import React from 'react';

import { TalentInfoDetails } from '~/bundles/common/components/components';
import { useAppSelector } from '~/bundles/common/hooks/hooks';

const ProfilePreview: React.FC = () => {
    const { onboardingData } = useAppSelector(({ common }) => common);

    if (!onboardingData) {
        return null;
    }

    return <TalentInfoDetails talent={onboardingData} />;
};

export { ProfilePreview };
