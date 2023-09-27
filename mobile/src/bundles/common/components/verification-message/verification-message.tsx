import React from 'react';

import { Text } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

const VerificationMessage: React.FC = () => {
    return (
        <Text
            category={TextCategory.CAPTION}
            maxFontSizeMultiplier={1.1}
            style={[
                styles.text,
                globalStyles.p5,
                globalStyles.ph10,
                globalStyles.mr5,
            ]}
        >
            Waiting for approval
        </Text>
    );
};

export { VerificationMessage };
