import React from 'react';

import {
    Badge,
    Button,
    Tag,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    BadgeSize,
    EmployerBottomTabScreenName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useNavigation } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type EmployerBottomTabNavigationParameterList,
    type NavigationProp,
} from '~/bundles/common/types/types';
import { useCommonData } from '~/bundles/common-data/hooks/hooks';
import { getBadgeById } from '~/bundles/employer/helpers/helpers';
import { type CandidateDetailsType } from '~/bundles/employer/types/types';

import { MaxValue } from './constants/constants';
import { styles } from './styles';

const CandidateCard: React.FC<CandidateDetailsType> = (candidateInfo) => {
    const {
        profileName,
        salaryExpectation,
        jobTitle,
        location,
        experienceYears,
        englishLevel,
        description,
        talentBadges,
        hardSkills,
    } = candidateInfo;

    const { badgesData } = useCommonData();
    const navigation =
        useNavigation<
            NavigationProp<EmployerBottomTabNavigationParameterList>
        >();

    const handleUserSelect = (): void => {
        navigation.navigate(
            EmployerBottomTabScreenName.CANDIDATE_DETAILS,
            candidateInfo,
        );
    };

    if (!badgesData) {
        return null;
    }

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
                    <View>
                        <Text category={TextCategory.H5} style={styles.title}>
                            {profileName}
                        </Text>
                        <Text category={TextCategory.H5} style={styles.title}>
                            {jobTitle}
                        </Text>
                    </View>

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
                        {
                            englishLevel // TODO: add submitted at after fix backend
                        }
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
                    ?.slice(0, MaxValue.BADGES)
                    .map(
                        ({ level, score, badgeId, isShown }) =>
                            isShown && (
                                <Badge
                                    key={badgeId}
                                    size={BadgeSize.SMALL}
                                    iconSize={20}
                                    score={score}
                                    level={level}
                                    badge={getBadgeById(
                                        badgesData.items,
                                        badgeId,
                                    )}
                                />
                            ),
                    )}
            </View>
            <Text
                category={TextCategory.BUTTON}
                style={[
                    styles.skillsLabel,
                    globalStyles.pl15,
                    globalStyles.pb10,
                ]}
            >
                Skills
            </Text>
            <View
                style={[
                    styles.skills,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignItemsCenter,
                    globalStyles.pb20,
                    globalStyles.ph15,
                ]}
            >
                {hardSkills.slice(0, MaxValue.SKILLS).map(({ name, id }) => (
                    <Tag key={id} value={name} />
                ))}
            </View>
            <View style={[globalStyles.pb20, globalStyles.ph15]}>
                <Text category={TextCategory.BODY1}>
                    {description?.slice(0, MaxValue.CHAR_COUNT)}...
                </Text>
            </View>
            <View style={[styles.divider, globalStyles.width100]} />
            <Button
                label="Read more"
                style={[globalStyles.alignSelfFlexEnd, globalStyles.m10]}
                onPress={handleUserSelect}
            />
        </View>
    );
};

export { CandidateCard };
