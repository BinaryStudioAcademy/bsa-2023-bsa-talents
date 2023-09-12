import React from 'react';

import {
    Badge,
    Button,
    Tag,
    Text,
    View,
} from '~/bundles/common/components/components';
import { BadgeSize, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import { type BsaBadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';

import { styles } from './styles';

type BadgeName = ValueOf<typeof BsaBadgeStepBadgesTitle>;

type Properties = {
    id: number;
    salaryExpectation: number;
    jobTitle: string;
    location: string;
    experienceYears: number;
    englishLevel: string;
    description: string;
    published: string;
    hardSkills: string[];
    badges: {
        label: BadgeName;
        value: string | number;
    }[];
};
const maxSkills = 4;
const maxBadges = 2;
const maxCharCount = 150;

const CandidateCard: React.FC<Properties> = ({
    id,
    salaryExpectation,
    jobTitle,
    location,
    experienceYears,
    englishLevel,
    description,
    published,
    hardSkills,
    badges,
}) => {
    return (
        <View
            style={[
                styles.container,
                globalStyles.mt15,
                globalStyles.mh15,
                globalStyles.borderRadius10,
            ]}
        >
            <View style={[globalStyles.pv20, globalStyles.ph15]}>
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentSpaceBetween,
                    ]}
                >
                    <Text category={TextCategory.H5} style={styles.title}>
                        {jobTitle}
                    </Text>
                    <Text category={TextCategory.H5} style={styles.salary}>
                        ${salaryExpectation}
                    </Text>
                </View>
                <View style={globalStyles.mt5}>
                    <Text
                        category={TextCategory.CAPTION}
                        style={styles.supportingText}
                    >
                        {location} | Lviv | {experienceYears} year(s) of
                        experience |
                    </Text>
                    <Text
                        category={TextCategory.CAPTION}
                        style={styles.supportingText}
                    >
                        {englishLevel} | {published}
                    </Text>
                </View>
            </View>
            <View style={[styles.divider, globalStyles.width100]} />
            <View
                style={[
                    globalStyles.pv20,
                    globalStyles.ph15,
                    globalStyles.flexDirectionRow,
                ]}
            >
                {badges.slice(0, maxBadges).map((badge) => (
                    <Badge
                        key={badge.label}
                        value={badge.value}
                        badgeType={badge.label}
                        size={BadgeSize.SMALL}
                        iconSize={20}
                    />
                ))}
            </View>
            <View
                style={[
                    styles.skills,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignItemsCenter,
                    globalStyles.pb20,
                    globalStyles.ph15,
                ]}
            >
                <Text
                    category={TextCategory.BUTTON}
                    style={[styles.skillsLabel]}
                >
                    Skills
                </Text>
                {hardSkills.slice(0, maxSkills).map((skill) => (
                    <Tag key={skill} value={skill} />
                ))}
            </View>
            <View style={[globalStyles.pb20, globalStyles.ph15]}>
                <Text category={TextCategory.BODY1}>
                    {description.slice(0, maxCharCount)}...
                </Text>
            </View>
            <View style={[styles.divider, globalStyles.width100]} />
            <Button
                label="Read more"
                style={[globalStyles.alignSelfFlexEnd, globalStyles.m10]}
                onPress={(): number => id} // TODO redirect to certain candidate
            />
        </View>
    );
};

export { CandidateCard };
