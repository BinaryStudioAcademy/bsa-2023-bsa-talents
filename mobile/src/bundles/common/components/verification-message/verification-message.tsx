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
            category={TextCategory.CAPTION}
            style={[styles.text, globalStyles.p5, globalStyles.ph10]}
        >
            Waiting for approval
        </Text>
    );
};

export { VerificationMessage };
