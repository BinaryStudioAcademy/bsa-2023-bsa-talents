import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
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
        <View style={globalStyles.flexDirectionRow}>
            <Text category={TextCategory.STEP} style={{ letterSpacing: 1.5 }}>
                Step {paddedStep}
            </Text>
            <Text category={TextCategory.INPUT} style={{ letterSpacing: 1.5 }}>
                {' '}
                / {paddedTotalSteps}
            </Text>
        </View>
    );
};

export { StepTrack };
