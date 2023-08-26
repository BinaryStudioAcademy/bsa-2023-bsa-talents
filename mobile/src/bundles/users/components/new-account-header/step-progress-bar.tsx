import React from 'react';

import { View } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties = {
    currentStep: number;
    totalSteps: number;
};

const StepProgressBar: React.FC<Properties> = ({ currentStep, totalSteps }) => {
    const max = 100;

    return (
        <View style={[globalStyles.flexDirectionRow, { height: 3 }]}>
            <View
                style={[
                    {
                        width: `${(max / totalSteps) * currentStep}%`,
                        backgroundColor: Color.PRIMARY,
                    },
                ]}
            />
            <View
                style={[
                    globalStyles.width100,
                    {
                        backgroundColor: Color.TAG,
                    },
                ]}
            />
        </View>
    );
};

export { StepProgressBar };
