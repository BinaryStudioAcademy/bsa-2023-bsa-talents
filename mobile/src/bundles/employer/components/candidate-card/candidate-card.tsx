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
import { type UserDetailsResponseDto } from '~/bundles/employer/types/types';

import { CardConstants } from './constants/constants';
import { styles } from './styles';

const { MAX_CHAR_COUNT, MAX_SKILLS, MAX_BADGES } = CardConstants;

const CandidateCard: React.FC<UserDetailsResponseDto> = ({
    userId,
    salaryExpectation,
    jobTitle,
    location,
    experienceYears,
    englishLevel,
    description,
    talentBadges,
    talentHardSkills,
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
                        {location} | {experienceYears} year(s) of experience |
                    </Text>
                    <Text
                        category={TextCategory.CAPTION}
                        style={styles.supportingText}
                    >
                        {englishLevel}
                    </Text>
                </View>
            </View>
            <View style={[styles.divider, globalStyles.width100]} />
            <View
                style={[
                    globalStyles.pv20,
                    globalStyles.ph15,
                    globalStyles.flexDirectionRow,
                    styles.badgeContainer,
                ]}
            >
                {talentBadges
                    // TODO: Replace value with common data from store and remove chain after fix backend
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    ?.slice(0, MAX_BADGES)
                    .map(
                        ({ level, score, badgeId, isShown }) =>
                            isShown && (
                                <Badge
                                    key={badgeId}
                                    value={score}
                                    badgeType={level}
                                    size={BadgeSize.SMALL}
                                    iconSize={20}
                                />
                            ),
                    )}
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

                {talentHardSkills
                    // TODO: Replace value with common data from store and remove chain after fix backend
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    ?.slice(0, MAX_SKILLS)
                    .map(({ hardSkillId }) => (
                        <Tag key={hardSkillId} value={hardSkillId} />
                    ))}
            </View>
            <View style={[globalStyles.pb20, globalStyles.ph15]}>
                <Text category={TextCategory.BODY1}>
                    {description?.slice(0, MAX_CHAR_COUNT)}...
                </Text>
            </View>
            <View style={[styles.divider, globalStyles.width100]} />
            <Button
                label="Read more"
                style={[globalStyles.alignSelfFlexEnd, globalStyles.m10]}
                onPress={(): string => userId} // TODO redirect to certain candidate
            />
        </View>
    );
};

export { CandidateCard };
