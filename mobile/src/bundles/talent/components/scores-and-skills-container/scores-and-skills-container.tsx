import React from 'react';
import { type BsaBadgeStepBadgesTitle, type ValueOf } from 'shared/build/index';

import { Tag, Text, View } from '~/bundles/common/components/components';
import { BadgeSize, TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { Badge } from '../components';
import { styles } from './styles';

type BadgeName = ValueOf<typeof BsaBadgeStepBadgesTitle>;

const ScoresAndSkillsContainer: React.FC = () => {
    const { onboardingData } = useAppSelector(({ talents }) => talents);

    if (!onboardingData) {
        return null;
    }

    const { badges, hardSkills } = onboardingData;

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
                        <Badge
                            key={badge}
                            badgeType={badge as BadgeName}
                            size={BadgeSize.SMALL}
                            iconSize={20}
                        />
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
                {hardSkills?.map((skill) => {
                    return <Tag key={skill.label} value={skill.label} />;
                })}
            </View>
        </View>
    );
};

export { ScoresAndSkillsContainer };