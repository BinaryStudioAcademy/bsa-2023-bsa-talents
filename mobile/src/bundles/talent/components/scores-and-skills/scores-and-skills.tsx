import React from 'react';
import { type BsaBadgeStepBadgesTitle, type ValueOf } from 'shared/build/index';

import { Tag, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { Badge } from '../components';
import { styles } from './styles';

//import { styles } from './styles';
type Badge = {
    label: ValueOf<typeof BsaBadgeStepBadgesTitle>;
    value: number;
};

type Properties = {
    badges: Badge[];
    skills: string[];
};

const ScoresAndSkills = ({ badges, skills }: Properties): JSX.Element => {
    return (
        <View style={[globalStyles.pv20, globalStyles.ph15]}>
            <Text category={TextCategory.H4} style={globalStyles.pb10}>
                Academy's scores
            </Text>
            {badges.map((badge) => {
                return (
                    <Badge
                        key={badge.label}
                        badgeType={badge.label}
                        value={badge.value}
                    />
                );
            })}

            <Text category={TextCategory.H4} style={globalStyles.pb10}>
                Skills
            </Text>
            <View style={[globalStyles.flexDirectionRow, styles.tagsWrapper]}>
                {skills.map((skill) => {
                    return <Tag key={skill} value={skill} />;
                })}
            </View>
        </View>
    );
};

export { ScoresAndSkills };
