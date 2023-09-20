import React from 'react';

import { Text } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    isApproved: boolean;
};

const VerificationMessage: React.FC<Properties> = ({ isApproved }) => {
    if (isApproved) {
        return null;
    }

    return (
        <Text
            category={TextCategory.LABEL}
            style={[styles.text, globalStyles.pv5, globalStyles.ph15]}
        >
            Waiting for approval
        </Text>
    );
};

export { VerificationMessage };
