import React from 'react';

import { Text } from '~/bundles/common/components/components';
import { useAppRoute, useCallback } from '~/bundles/common/hooks/hooks';

import { ProfileForm } from '../components/components';

const Profile: React.FC = () => {
    const { name } = useAppRoute();

    const handleProfileSubmit = useCallback(() => {
        return null;
    }, []);

    return (
        <>
            <Text>Header {name}</Text>
            <ProfileForm onSubmit={handleProfileSubmit} />
        </>
    );
};

export { Profile };
