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
    CVAndContactsForm,
    NewAccountHeader,
} from '~/bundles/talent/components/components';
import { useOnboardingFormSubmit } from '~/bundles/talent/hooks/hooks';
import { type CvAndContactsFormDto } from '~/bundles/talent/types/types';

const CVAndContacts: React.FC = () => {
    const { name } = useAppRoute();
    const { onboardingData } = useAppSelector(({ common }) => common);

    const cvAndContactsStepData: CvAndContactsFormDto | null = onboardingData
        ? {
              photo: onboardingData.photo ?? null,
              fullName: onboardingData.fullName ?? '',
              phone: onboardingData.phone ?? '',
              linkedinLink: onboardingData.linkedinLink ?? '',
              cv: onboardingData.cv ?? null,
          }
        : null;

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleSubmit = useOnboardingFormSubmit({ stepTitle, stepNumber });

    const handleCVAndContactsSubmit = (payload: CvAndContactsFormDto): void => {
        void handleSubmit(payload);
    };

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <CVAndContactsForm
                cvAndContactsStepData={cvAndContactsStepData}
                onSubmit={handleCVAndContactsSubmit}
                currentStep={stepNumber}
            />
        </View>
    );
};

export { CVAndContacts };
