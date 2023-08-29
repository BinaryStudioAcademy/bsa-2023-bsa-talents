import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import {
    OnboardingScreenName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';

import { StepProgressBar } from './step-progress-bar';
import { StepTrack } from './step-track';
import { styles } from './styles';

type Properties = {
    title: ValueOf<typeof OnboardingScreenName>;
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
                    styles.headerContainer,
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
