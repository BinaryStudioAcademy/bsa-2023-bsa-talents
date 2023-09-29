import React from 'react';

import { Loader, View } from '~/bundles/common/components/components';
import {
    type EnglishLevelLMS,
    type TalentOnboardingScreenName,
} from '~/bundles/common/enums/enums';
import {
    DataStatus,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import {
    useAppRoute,
    useAppSelector,
    useHardSkillData,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    NewAccountHeader,
    SkillsFormData,
    WithProfileForm,
} from '~/bundles/talent/components/components';
import { TalentFormType } from '~/bundles/talent/enums/enums';
import { stringsToUrlObjects } from '~/bundles/talent/helpers/helpers';
import { useOnboardingFormSubmit } from '~/bundles/talent/hooks/hooks';
import { type SkillsStepDto } from '~/bundles/talent/types/types';
import { skillsStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import {
    ENGLISH_LMS_MAP,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
} from './constants/constants';

const SkillsAndProjects: React.FC = () => {
    const { name } = useAppRoute();
    const { onboardingData, dataStatus } = useAppSelector(
        ({ common }) => common,
    );

    const { lmsData, dataStatus: commonDataStatus } = useAppSelector(
        ({ commonData }) => commonData,
    );

    const hardSkillsData = useHardSkillData(onboardingData?.talentHardSkills);

    const englishLevelLms =
        lmsData?.talent.english &&
        ENGLISH_LMS_MAP[
            lmsData.talent.english as ValueOf<typeof EnglishLevelLMS>
        ];

    const skillsStepData: SkillsStepDto | null = onboardingData
        ? {
              hardSkills: hardSkillsData,
              notConsidered: onboardingData.notConsidered ?? [],
              preferredLanguages: onboardingData.preferredLanguages ?? [],
              projectLinks: stringsToUrlObjects(onboardingData.projectLinks),
              englishLevel: onboardingData.englishLevel ?? englishLevelLms,
          }
        : null;

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleSubmit = useOnboardingFormSubmit({ stepTitle, stepNumber });

    const handleSkillsSubmit = (payload: SkillsStepDto): void => {
        const { hardSkills, ...data } = payload;
        const talentHardSkills = hardSkills.map(({ value }) => value);

        void handleSubmit({ ...data, talentHardSkills });
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
