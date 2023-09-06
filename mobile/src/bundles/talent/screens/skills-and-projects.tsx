import React from 'react';

import { View } from '~/bundles/common/components/components';
import {
    Color,
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    NewAccountHeader,
    SkillsAndProjectsForm,
} from '~/bundles/talent/components/components';
import { actions as talentActions } from '~/bundles/talent/store';
import { type SkillsStepDto } from '~/bundles/talent/types/types';

const SkillsAndProjects: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();
    const { skillsStepData } = useAppSelector(({ talents }) => talents);

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleSkillsSubmit = useCallback(
        (payload: SkillsStepDto): void => {
            void dispatch(talentActions.completeSkillsStep(payload));
        },
        [dispatch],
    );

    return (
        <View style={[globalStyles.flex1, { backgroundColor: Color.TEXT }]}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <SkillsAndProjectsForm
                onSubmit={handleSkillsSubmit}
                skillsStepData={skillsStepData}
            />
        </View>
    );
};

export { SkillsAndProjects };
