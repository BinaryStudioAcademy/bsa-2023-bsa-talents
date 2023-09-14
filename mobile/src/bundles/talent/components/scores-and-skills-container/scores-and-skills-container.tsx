import React from 'react';
import {
    type BsaBadgeStepBadgesTitle,
    type SkillsStepDto,
    type ValueOf,
} from 'shared/build/index';

import { Tag, Text, View } from '~/bundles/common/components/components';
import { BadgeSize, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { Badge } from '../components';
import { styles } from './styles';

type Badge = {
    label: ValueOf<typeof BsaBadgeStepBadgesTitle>;
    value: number;
};

type Properties = {
    badges: BadgeName[];
    skills?: SkillsStepDto['hardSkills'];
};

type BadgeName = ValueOf<typeof BsaBadgeStepBadgesTitle>;

const ScoresAndSkillsContainer = ({
    badges,
    skills,
}: Properties): JSX.Element => {
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
                {badges.map((badge) => {
                    return (
                        <Badge
                            key={badge}
                            badgeType={badge}
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
                {skills?.map((skill) => {
                    return <Tag key={skill.label} value={skill.label} />;
                })}
            </View>
        </View>
    );
};

export { ScoresAndSkillsContainer };
