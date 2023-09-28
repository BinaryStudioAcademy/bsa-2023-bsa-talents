import React from 'react';

import { TalentInfoDetails } from '~/bundles/common/components/components';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import {
    type CandidateDetailsType,
    type CandidateHardSkill,
} from '~/bundles/talent/types/types';

const ProfilePreview: React.FC = () => {
    const { onboardingData } = useAppSelector(({ common }) => common);

    if (!onboardingData || !onboardingData.hardSkills) {
        return null;
    }
    // TODO: Change when backend shared values will fixed
    const formattedHardSkills: CandidateHardSkill =
        onboardingData.hardSkills.map((hardSkills) => ({
            name: hardSkills.label,
            id: hardSkills.value,
        }));
    const talentData: CandidateDetailsType = {
        ...onboardingData,
        hardSkills: formattedHardSkills,
    };

    return <TalentInfoDetails talent={talentData} />;
};

export { ProfilePreview };
