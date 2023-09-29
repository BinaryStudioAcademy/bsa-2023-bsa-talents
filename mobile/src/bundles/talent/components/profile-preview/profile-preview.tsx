import React from 'react';

import {
    Loader,
    TalentInfoDetails,
} from '~/bundles/common/components/components';
import { useAppSelector, useHardSkillData } from '~/bundles/common/hooks/hooks';
import {
    type CandidateDetailsType,
    type CandidateHardSkill,
} from '~/bundles/talent/types/types';

const ProfilePreview: React.FC = () => {
    const { onboardingData } = useAppSelector(({ common }) => common);

    const hardSkills = useHardSkillData(onboardingData?.talentHardSkills);

    if (!onboardingData?.talentHardSkills) {
        return <Loader />;
    }

    // TODO: Change when backend shared values will fixed
    const formattedHardSkills: CandidateHardSkill = hardSkills.map(
        (skills) => ({
            name: skills.label,
            id: skills.value,
        }),
    );

    const talentData: CandidateDetailsType = {
        ...onboardingData,
        hardSkills: formattedHardSkills,
    };

    return <TalentInfoDetails talent={talentData} />;
};

export { ProfilePreview };
