import React from 'react';

import { Overlay, View } from '~/bundles/common/components/components';
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
    SkillsAndProjectsForm,
} from '~/bundles/talent/components/components';
import { stringsToUrlObjects } from '~/bundles/talent/helpers/helpers';
import { useOnboardingFormSubmit } from '~/bundles/talent/hooks/hooks';
import { type SkillsStepDto } from '~/bundles/talent/types/types';

const SkillsAndProjects: React.FC = () => {
    const { name } = useAppRoute();
    const { onboardingData, dataStatus } = useAppSelector(
        ({ talents }) => talents,
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
        <>
            <Overlay isActive={isDataLoading} />
            <View style={globalStyles.flex1}>
                <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
                <SkillsAndProjectsForm
                    skillsStepData={skillsStepData}
                    onSubmit={handleSkillsSubmit}
                    currentStep={stepNumber}
                />
            </View>
        </>
    );
};

export { SkillsAndProjects };
