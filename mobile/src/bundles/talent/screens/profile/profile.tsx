import React from 'react';

import { Loader, View } from '~/bundles/common/components/components';
import {
    DataStatus,
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import { useAppRoute, useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import { NewAccountHeader } from '~/bundles/talent/components/components';
import { ProfileFormData } from '~/bundles/talent/components/profile-form-data/profile-form-data';
import { WithProfileForm } from '~/bundles/talent/components/with-profile-form/with-profile-form';
import { TalentFormType } from '~/bundles/talent/enums/enums';
import { useOnboardingFormSubmit } from '~/bundles/talent/hooks/hooks';
import { type ProfileStepDto } from '~/bundles/talent/types/types';
import { profileStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { TALENT_PROFILE_DEFAULT_VALUES } from './constants/constants';

const Profile: React.FC = () => {
    const { name } = useAppRoute();
    const { onboardingData, dataStatus } = useAppSelector(
        ({ common }) => common,
    );

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

    const isDataLoading = dataStatus === DataStatus.PENDING;

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            {isDataLoading ? (
                <Loader />
            ) : (
                <WithProfileForm
                    validationSchema={profileStepValidationSchema}
                    defaultValue={TALENT_PROFILE_DEFAULT_VALUES}
                    value={profileStepData}
                    onSubmit={handleProfileSubmit}
                    formType={TalentFormType.ONBOARDING}
                    renderedForm={ProfileFormData}
                />
            )}
        </View>
    );
};

export { Profile };
