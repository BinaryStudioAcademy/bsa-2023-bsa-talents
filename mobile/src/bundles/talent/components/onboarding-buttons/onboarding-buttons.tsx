import React from 'react';

import { Button, View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';
import { OnboardingBackButton } from '~/bundles/talent/components/components';

type OnboardingButtonsProperties = {
    currentStep: number;
    onFormSubmit: () => void;
};

const OnboardingButtons: React.FC<OnboardingButtonsProperties> = ({
    currentStep,
    onFormSubmit,
}) => {
    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.mt10,
                globalStyles.mb25,
            ]}
        >
            {currentStep !== 0 && (
                <OnboardingBackButton currentStep={currentStep} />
            )}
            <Button label="Next" onPress={onFormSubmit} />
        </View>
    );
};

export { OnboardingButtons };
