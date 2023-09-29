import React from 'react';

import {
    Badge,
    Loader,
    Tag,
    Text,
    View,
} from '~/bundles/common/components/components';
import { BadgeSize, TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector, useHardSkillData } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type CandidateHardSkill } from '~/bundles/employer/types/types';

import { styles } from './styles';

type ScoresAndSkillsContainerProperties = {
    candidateHardSkill?: CandidateHardSkill;
};

const ScoresAndSkillsContainer: React.FC<
    ScoresAndSkillsContainerProperties
> = ({ candidateHardSkill }) => {
    const { onboardingData } = useAppSelector(({ common }) => common);
    const talentHardSkillData = useHardSkillData(
        onboardingData?.talentHardSkills,
    );

    if (!onboardingData) {
        return <Loader />;
    }

    const { badges } = onboardingData;

    return (
        <View>
            <Text category={TextCategory.BODY1} style={globalStyles.pb10}>
                Academy's scores
            </Text>
            <View
                style={[
                    globalStyles.pb20,
                    globalStyles.flexDirectionRow,
                    styles.badgesWrapper,
                ]}
            >
                {badges?.map((badge) => {
                    return (
                        badge.isChecked && (
                            <Badge
                                key={badge.id}
                                badge={badge}
                                size={BadgeSize.SMALL}
                                iconSize={20}
                            />
                        )
                    );
                })}
            </View>

            <Text category={TextCategory.BODY1} style={globalStyles.pb10}>
                Skills
            </Text>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignItemsCenter,
                    globalStyles.pb20,
                    styles.tagsWrapper,
                ]}
            >
                {candidateHardSkill
                    ? candidateHardSkill.map((skill) => (
                          <Tag key={skill.id} value={skill.name} />
                      ))
                    : talentHardSkillData.map((skill) => (
                          <Tag key={skill.value} value={skill.label} />
                      ))}
            </View>
        </View>
    );
};

export { ScoresAndSkillsContainer };
