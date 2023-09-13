import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import { View } from '~/bundles/common/components/components';
import {
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
    TalentOnboardingStepState,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type TalentOnboardingNavigationParameterList,
    type ValueOf,
} from '~/bundles/common/types/types';
import {
    NewAccountHeader,
    SkillsAndProjectsForm,
} from '~/bundles/talent/components/components';
import {
    getNextStepTitle,
    stringsToUrlObjects,
    urlObjectsToStrings,
} from '~/bundles/talent/helpers/helpers';
import { actions as talentActions } from '~/bundles/talent/store';
import { type SkillsStepDto } from '~/bundles/talent/types/types';

const SkillsAndProjects: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();
    const { onboardingData } = useAppSelector(({ talents }) => talents);

    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const userId = currentUserData?.id ?? '';

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

    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handleSubmit = useCallback(
        async (payload: SkillsStepDto): Promise<void> => {
            const updatedSkillsAndProjectsPayload = {
                ...payload,
                userId,
                projectLinks: urlObjectsToStrings(payload.projectLinks),
            };

            const result = await dispatch(
                talentActions.updateOnboardingData(
                    updatedSkillsAndProjectsPayload,
                ),
            );

            if (result.payload) {
                const setStepResult = dispatch(
                    talentActions.setCompletedStep(stepTitle),
                );
                const nextStepTitle = getNextStepTitle(stepNumber);
                if (setStepResult.payload && nextStepTitle) {
                    navigate(nextStepTitle, {
                        stepState: TalentOnboardingStepState.FOCUSED,
                    });
                }
            }
        },
        [dispatch, navigate, userId, stepNumber, stepTitle],
    );

    const handleSkillsSubmit = (payload: SkillsStepDto): void => {
        void handleSubmit(payload);
    };

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <SkillsAndProjectsForm
                skillsStepData={skillsStepData}
                onSubmit={handleSkillsSubmit}
                currentStep={stepNumber}
            />
        </View>
    );
};

export { SkillsAndProjects };
