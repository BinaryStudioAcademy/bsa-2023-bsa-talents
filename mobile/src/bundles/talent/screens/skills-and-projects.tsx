import React from 'react';

import { View } from '~/bundles/common/components/components';
import {
    Color,
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import { useAppRoute, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    NewAccountHeader,
    SkillsAndProjectsForm,
} from '~/bundles/talent/components/components';

const SkillsAndProjects: React.FC = () => {
    const { name } = useAppRoute();
    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleSkillsSubmit = useCallback(() => {
        return null;
    }, []);

    return (
        <View style={[globalStyles.flex1, { backgroundColor: Color.TEXT }]}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <SkillsAndProjectsForm onSubmit={handleSkillsSubmit} />
        </View>
    );
};

export { SkillsAndProjects };
