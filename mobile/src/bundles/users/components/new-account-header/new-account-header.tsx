import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import {
    OnboardingScreenName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { StepProgressBar } from './step-progress-bar';
import { StepTrack } from './step-track';

type Properties = {
    title: (typeof OnboardingScreenName)[keyof typeof OnboardingScreenName];
    currentStep: number;
};

const NewAccountHeader: React.FC<Properties> = ({ title, currentStep }) => {
    const totalSteps = Object.keys(OnboardingScreenName).length;

    return (
        <>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    globalStyles.borderRadiusTop8,
                    globalStyles.p20,
                    { backgroundColor: '#FFFFFF' },
                ]}
            >
                <Text category={TextCategory.H5}>{title}</Text>
                <StepTrack currentStep={currentStep} totalSteps={totalSteps} />
            </View>
            <StepProgressBar
                currentStep={currentStep}
                totalSteps={totalSteps}
            />
        </>
    );
};

export { NewAccountHeader };
