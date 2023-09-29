import React from 'react';

import { Loader, View } from '~/bundles/common/components/components';
import { DataStatus } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useHardSkillData,
} from '~/bundles/common/hooks/hooks';
import { updateOnboardingData } from '~/bundles/common/store/actions';
import { globalStyles } from '~/bundles/common/styles/global-styles/global-styles';
import {
    SkillsFormData,
    WithProfileForm,
} from '~/bundles/talent/components/components';
import { TalentFormType } from '~/bundles/talent/enums/enums';
import {
    stringsToUrlObjects,
    urlObjectsToStrings,
} from '~/bundles/talent/helpers/helpers';
import { SKILLS_AND_PROJECTS_DEFAULT_VALUES } from '~/bundles/talent/screens/skills-and-projects/constants/constants';
import { type SkillsStepDto } from '~/bundles/talent/types/types';
import { skillsStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

const ProfileScreenSkills: React.FC = () => {
    const { onboardingData, dataStatus } = useAppSelector(
        ({ common }) => common,
    );

    const dispatch = useAppDispatch();

    const hardSkillsData = useHardSkillData(onboardingData?.talentHardSkills);

    const skillsStepData: SkillsStepDto | null = onboardingData
        ? {
              hardSkills: hardSkillsData,
              englishLevel: onboardingData.englishLevel,
              notConsidered: onboardingData.notConsidered ?? [],
              preferredLanguages: onboardingData.preferredLanguages ?? [],
              projectLinks: stringsToUrlObjects(onboardingData.projectLinks),
          }
        : null;

    const handleSkillsSubmit = (payload: SkillsStepDto): void => {
        const { hardSkills, projectLinks, ...data } = payload;
        const updatedProjectLinks = urlObjectsToStrings(projectLinks);
        const talentHardSkills = hardSkills.map(({ value }) => value);

        void dispatch(
            updateOnboardingData({
                ...data,
                projectLinks: updatedProjectLinks,
                userId: onboardingData?.userId,
                talentHardSkills,
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
