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
import {
    NewAccountHeader,
    SkillsFormData,
} from '~/bundles/talent/components/components';
import { WithProfileForm } from '~/bundles/talent/components/with-profile-form/with-profile-form';
import { TalentFormType } from '~/bundles/talent/enums/talent-form-type/talent-form-type.enum';
import { stringsToUrlObjects } from '~/bundles/talent/helpers/helpers';
import { useOnboardingFormSubmit } from '~/bundles/talent/hooks/hooks';
import { type SkillsStepDto } from '~/bundles/talent/types/types';
import { skillsStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { SKILLS_AND_PROJECTS_DEFAULT_VALUES } from './constants/constants';

const SkillsAndProjects: React.FC = () => {
    const { name } = useAppRoute();
    const { onboardingData, dataStatus } = useAppSelector(
        ({ common }) => common,
    );
    const commonDataStatus = useAppSelector(
        ({ commonData }) => commonData.dataStatus,
    );

    const skillsStepData: SkillsStepDto | null = onboardingData
        ? {
              hardSkills: onboardingData.hardSkills ?? [],
              englishLevel: onboardingData.englishLevel,
              notConsidered: onboardingData.notConsidered ?? [],
              preferredLanguages: onboardingData.preferredLanguages ?? [],
              projectLinks: stringsToUrlObjects(onboardingData.projectLinks),
          }
        : null;

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleSubmit = useOnboardingFormSubmit({ stepTitle, stepNumber });

    const handleSkillsSubmit = (payload: SkillsStepDto): void => {
        void handleSubmit(payload);
    };

    const isDataLoading =
        dataStatus === DataStatus.PENDING ||
        commonDataStatus === DataStatus.PENDING;

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            {isDataLoading ? (
                <Loader />
            ) : (
                <WithProfileForm
                    defaultValue={SKILLS_AND_PROJECTS_DEFAULT_VALUES}
                    value={skillsStepData}
                    onSubmit={handleSkillsSubmit}
                    validationSchema={skillsStepValidationSchema}
                    formType={TalentFormType.ONBOARDING}
                    renderedForm={SkillsFormData}
                    currentStep={stepNumber}
                />
            )}
        </View>
    );
};

export { SkillsAndProjects };
