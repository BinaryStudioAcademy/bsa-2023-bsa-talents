import React from 'react';

import { View } from '~/bundles/common/components/components';
import {
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import { useAppRoute, useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    BsaBadgesForm,
    NewAccountHeader,
} from '~/bundles/talent/components/components';
import { useOnboardingFormSubmit } from '~/bundles/talent/hooks/hooks';
import { type BsaBadgesStepDto } from '~/bundles/talent/types/types';

const BsaBadges: React.FC = () => {
    const { name } = useAppRoute();
    const { onboardingData } = useAppSelector(({ common }) => common);

    const badgesStepData: BsaBadgesStepDto | null = onboardingData?.badges
        ? {
              badges: onboardingData.badges,
          }
        : null;

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleSubmit = useOnboardingFormSubmit({ stepTitle, stepNumber });

    const handleBadgesSubmit = (payload: BsaBadgesStepDto): void => {
        void handleSubmit(payload);
    };

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <BsaBadgesForm
                badgesStepData={badgesStepData}
                onSubmit={handleBadgesSubmit}
                currentStep={stepNumber}
            />
        </View>
    );
};

export { BsaBadges };
