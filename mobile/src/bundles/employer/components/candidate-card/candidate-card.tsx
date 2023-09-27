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
    RootScreenName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useNavigation } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type NavigationProp,
    type RootNavigationParameterList,
} from '~/bundles/common/types/types';
import { useCommonData } from '~/bundles/common-data/hooks/hooks';
import {
    getBadgeById,
    getHardSkillByValue,
} from '~/bundles/employer/helpers/helpers';
import { type UserDetailsResponseDto } from '~/bundles/employer/types/types';

import { MaxValue } from './constants/constants';
import { styles } from './styles';

const CandidateCard: React.FC<UserDetailsResponseDto> = (candidateInfo) => {
    const {
        fullName,
        salaryExpectation,
        jobTitle,
        location,
        experienceYears,
        englishLevel,
        description,
        talentBadges,
        talentHardSkills,
    } = candidateInfo;

    const { badgesData, hardSkillsData } = useCommonData();
    const navigation =
        useNavigation<NavigationProp<RootNavigationParameterList>>();

    const handleUserSelect = (): void => {
        navigation.navigate(RootScreenName.CANDIDATE_DETAILS, candidateInfo);
    };

    if (!badgesData || !hardSkillsData) {
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
                        <Text category={TextCategory.H5}>{fullName}</Text>
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
                    //TODO: remove after backend got badges values
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
                    //TODO: remove after backend got skills values
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    ?.slice(0, MaxValue.SKILLS)
                    .map(({ hardSkillId }) => (
                        <Tag
                            key={hardSkillId}
                            value={
                                getHardSkillByValue(
                                    hardSkillsData.items,
                                    hardSkillId,
                                ).label
                            }
                        />
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
