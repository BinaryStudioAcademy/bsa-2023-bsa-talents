import React from 'react';

import { Button } from '~/bundles/common/components/components';
import {
    ButtonType,
    TalentOnboardingScreenName,
} from '~/bundles/common/enums/enums';
import {
    useBackHandler,
    useCallback,
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type NavigationProp,
    type TalentOnboardingNavigationParameterList,
} from '~/bundles/common/types/types';
import { getPreviousStepTitle } from '~/bundles/talent/helpers/helpers';

type Properties = {
    currentStep: number;
};

const OnboardingBackButton: React.FC<Properties> = ({ currentStep }) => {
    const { reset } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handlePreviousPress = useCallback((): boolean => {
        const previousScreenName =
            getPreviousStepTitle(currentStep) ??
            TalentOnboardingScreenName.PROFILE;
        reset({
            index: 0,
            routes: [{ name: previousScreenName }],
        });

        return true;
    }, [reset, currentStep]);

    useBackHandler(handlePreviousPress);

    return (
        <Button
            style={globalStyles.mr10}
            label="Back"
            buttonType={ButtonType.OUTLINE}
            onPress={handlePreviousPress}
        />
    );
};

export { OnboardingBackButton };
