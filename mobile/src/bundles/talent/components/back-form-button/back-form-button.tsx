import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Button } from '~/bundles/common/components/components';
import {
    ButtonType,
    TalentOnboardingStepState,
} from '~/bundles/common/enums/enums';
import { useCallback, useNavigation } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type TalentOnboardingNavigationParameterList } from '~/bundles/common/types/types';
import { getPreviousStepTitle } from '~/bundles/talent/helpers/helpers';

type Properties = {
    currentStep: number;
};

const BackFormButton: React.FC<Properties> = ({ currentStep }) => {
    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handlePreviousPress = useCallback((): void => {
        const previousScreenName = getPreviousStepTitle(currentStep);
        if (previousScreenName) {
            navigate(previousScreenName, {
                stepState: TalentOnboardingStepState.FOCUSED,
            });
        }
    }, [navigate, currentStep]);

    return (
        <Button
            style={globalStyles.mr10}
            label="Back"
            buttonType={ButtonType.OUTLINE}
            onPress={handlePreviousPress}
        />
    );
};

export { BackFormButton };
