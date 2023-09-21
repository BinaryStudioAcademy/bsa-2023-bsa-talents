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
    NewAccountHeader,
    ProfileForm,
} from '~/bundles/talent/components/components';
import { useOnboardingFormSubmit } from '~/bundles/talent/hooks/hooks';
import { type ProfileStepDto } from '~/bundles/talent/types/types';

const Profile: React.FC = () => {
    const { name } = useAppRoute();
    const { onboardingData } = useAppSelector(({ talents }) => talents);

    const {
        profileName,
        salaryExpectation,
        jobTitle,
        location,
        experienceYears,
        employmentType,
        description,
    } = onboardingData ?? {};
    const profileStepData: ProfileStepDto | null = onboardingData
        ? ({
              profileName,
              salaryExpectation,
              jobTitle,
              location,
              experienceYears,
              employmentType,
              description,
          } as ProfileStepDto)
        : null;

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleSubmit = useOnboardingFormSubmit({
        stepTitle,
        stepNumber,
        isNewTalentOnboardingData: !onboardingData?.completedStep,
    });

    const handleProfileSubmit = (payload: ProfileStepDto): void => {
        void handleSubmit(payload);
    };

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <ProfileForm
                profileStepData={profileStepData}
                onSubmit={handleProfileSubmit}
            />
        </View>
    );
};

export { Profile };
