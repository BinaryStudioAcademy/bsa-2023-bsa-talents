import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { AccountSteps } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { StepProgressBar } from './step-progress-bar';
import { StepTrack } from './step-track';

type Properties = {
    title: (typeof AccountSteps)[keyof typeof AccountSteps];
    currentStep: number;
};

const NewAccountHeader: React.FC<Properties> = ({ title, currentStep }) => {
    const totalSteps = Object.keys(AccountSteps).length;

    return (
        <>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    globalStyles.p20,
                ]}
            >
                <Text category="H5">{title}</Text>
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
