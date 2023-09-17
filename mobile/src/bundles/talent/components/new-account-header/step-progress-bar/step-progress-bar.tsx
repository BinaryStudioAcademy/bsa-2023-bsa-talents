import React from 'react';

import { View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from '../styles.js';

type Properties = {
    currentStep: number;
    totalSteps: number;
};

const StepProgressBar: React.FC<Properties> = ({ currentStep, totalSteps }) => {
    const max = 100;

    return (
        <View
            style={[globalStyles.flexDirectionRow, styles.progressBarContainer]}
        >
            <View
                style={[
                    { width: `${(max / totalSteps) * currentStep}%` },
                    styles.progressBarFill,
                ]}
            />
            <View
                style={[globalStyles.width100, styles.progressBarBackground]}
            />
        </View>
    );
};

export { StepProgressBar };
