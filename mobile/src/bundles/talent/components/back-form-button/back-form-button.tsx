import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Button } from '~/bundles/common/components/components';
import {
    ButtonType,
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
    TalentOnboardingStepState,
} from '~/bundles/common/enums/enums';
import { useCallback, useNavigation } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type TalentOnboardingNavigationParameterList,
    type ValueOf,
} from '~/bundles/common/types/types';

type ScreenName = ValueOf<typeof TalentOnboardingScreenName>;

const STEP = 1;

const previousStepTitle = (currentStep: number): ScreenName | undefined => {
    const screenNames = Object.keys(
        TalentOnboardingScreenNumber,
    ) as (keyof typeof TalentOnboardingScreenName)[];

    const screenName = screenNames.find(
        (key) =>
            TalentOnboardingScreenNumber[key as ScreenName] ===
            currentStep - STEP,
    );

    return screenName as ScreenName;
};

type Properties = {
    currentStep: number;
};

const BackFormButton: React.FC<Properties> = ({ currentStep }) => {
    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handlePreviousPress = useCallback((): void => {
        const previousScreenName = previousStepTitle(currentStep);
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
