import React from 'react';

import { View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from '../styles';

type Properties = {
    currentStep: number;
    totalSteps: number;
};
const MAX = 100;

const StepProgressBar: React.FC<Properties> = ({ currentStep, totalSteps }) => {
    return (
        <View
            style={[globalStyles.flexDirectionRow, styles.progressBarContainer]}
        >
            <View
                style={[
                    { width: `${(MAX / totalSteps) * currentStep}%` },
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
