import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { padNumberWithZero } from '~/bundles/common/helpers/helpers';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    currentStep: number;
    totalSteps: number;
};

const stepWidth = 2;

const StepTrack: React.FC<Properties> = ({ currentStep, totalSteps }) => {
    const paddedStep = padNumberWithZero(currentStep, stepWidth);
    const paddedTotalSteps = padNumberWithZero(totalSteps, stepWidth);

    return (
        <View style={globalStyles.flexDirectionRow}>
            <Text category={TextCategory.STEP} style={styles.letterSpacingText}>
                Step {paddedStep}
            </Text>
            <Text
                category={TextCategory.INPUT}
                style={styles.letterSpacingText}
            >
                {' '}
                / {paddedTotalSteps}
            </Text>
        </View>
    );
};

export { StepTrack };
