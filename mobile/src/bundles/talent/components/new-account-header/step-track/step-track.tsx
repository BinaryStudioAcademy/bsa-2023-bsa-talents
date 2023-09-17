import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from '../styles.js';

type Properties = {
    currentStep: number;
    totalSteps: number;
};

const StepTrack: React.FC<Properties> = ({ currentStep, totalSteps }) => {
    return (
        <View style={globalStyles.flexDirectionRow}>
            <Text category={TextCategory.STEP} style={styles.letterSpacingText}>
                Step {`0${currentStep}`}
            </Text>
            <Text
                category={TextCategory.INPUT}
                style={styles.letterSpacingText}
            >
                {' '}
                / {`0${totalSteps}`}
            </Text>
        </View>
    );
};

export { StepTrack };
