import React from 'react';
import { type SkillsStepDto } from 'shared/build/bundles/talent-onboarding/types/skills-step/skills-step-dto';

import { Loader, View } from '~/bundles/common/components/components';
import { DataStatus } from '~/bundles/common/enums/enums';
import { useAppDispatch } from '~/bundles/common/hooks/hooks';
import { useAppSelector } from '~/bundles/common/hooks/use-app-selector/use-app-selector.hook';
import { updateOnboardingData } from '~/bundles/common/store/actions';
import { globalStyles } from '~/bundles/common/styles/global-styles/global-styles';
import { SkillsFormData } from '~/bundles/talent/components/skills-form-data/skills-form-data';
import { WithProfileForm } from '~/bundles/talent/components/with-profile-form/with-profile-form';
import { TalentFormType } from '~/bundles/talent/enums/talent-form-type/talent-form-type.enum';
import {
    stringsToUrlObjects,
    urlObjectsToStrings,
} from '~/bundles/talent/helpers/manage-projects-links/manage-projects-links';
import { SKILLS_AND_PROJECTS_DEFAULT_VALUES } from '~/bundles/talent/screens/skills-and-projects/constants/constants';
import { skillsStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

const ProfileScreenSkills: React.FC = () => {
    const { onboardingData, dataStatus } = useAppSelector(
        ({ common }) => common,
    );
    const dispatch = useAppDispatch();
    const skillsStepData: SkillsStepDto | null = onboardingData
        ? {
              hardSkills: onboardingData.hardSkills ?? [],
              englishLevel: onboardingData.englishLevel,
              notConsidered: onboardingData.notConsidered ?? [],
              preferredLanguages: onboardingData.preferredLanguages ?? [],
              projectLinks: stringsToUrlObjects(onboardingData.projectLinks),
          }
        : null;

    const handleSkillsSubmit = (payload: SkillsStepDto): void => {
        const updatedProjectLinks = urlObjectsToStrings(payload.projectLinks);
        void dispatch(
            updateOnboardingData({
                ...payload,
                projectLinks: updatedProjectLinks,
                userId: onboardingData?.userId,
            }),
        );
    };

    const isDataLoading = dataStatus === DataStatus.PENDING;

    return (
        <View style={globalStyles.flex1}>
            {isDataLoading ? (
                <Loader />
            ) : (
                <WithProfileForm
                    defaultValue={SKILLS_AND_PROJECTS_DEFAULT_VALUES}
                    value={skillsStepData}
                    onSubmit={handleSkillsSubmit}
                    validationSchema={skillsStepValidationSchema}
                    formType={TalentFormType.PROFILE_SCREEN}
                    renderedForm={SkillsFormData}
                    isFormEditable={false}
                />
            )}
        </View>
    );
};

export { ProfileScreenSkills };
