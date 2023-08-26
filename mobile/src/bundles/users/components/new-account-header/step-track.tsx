import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties = {
    currentStep: number;
    totalSteps: number;
};

const formatStep = (step: number, width: number): string => {
    return String(step).padStart(width, '0');
};

const StepTrack: React.FC<Properties> = ({ currentStep, totalSteps }) => {
    const stepWidth = 2;
    const paddedStep = formatStep(currentStep, stepWidth);
    const paddedTotalSteps = formatStep(totalSteps, stepWidth);

    return (
        <View style={[globalStyles.flexDirectionRow, { letterSpacing: 1.5 }]}>
            <Text category="Step">Step {paddedStep}</Text>
            <Text category="Input"> / {paddedTotalSteps}</Text>
        </View>
    );
};

export { StepTrack };
