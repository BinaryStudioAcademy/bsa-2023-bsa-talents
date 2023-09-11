import React from 'react';

import {
    Button,
    Tag,
    Text,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    ID: number;
    SALARY_EXPECTATION: number;
    JOB_TITLE: string;
    LOCATION: string;
    EXPERIENCE_YEARS: number;
    ENGLISH_LEVEL: string;
    DESCRIPTION: string;
    PUBLISHED: string;
    HARD_SKILLS: string[];
};
const maxSkills = 4;
const maxCharCount = 150;

const CandidateCard: React.FC<Properties> = ({
    ID,
    SALARY_EXPECTATION,
    JOB_TITLE,
    LOCATION,
    EXPERIENCE_YEARS,
    ENGLISH_LEVEL,
    DESCRIPTION,
    PUBLISHED,
    HARD_SKILLS,
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
                        {JOB_TITLE}
                    </Text>
                    <Text category={TextCategory.H5} style={styles.salary}>
                        ${SALARY_EXPECTATION}
                    </Text>
                </View>
                <View style={globalStyles.mt5}>
                    <Text
                        category={TextCategory.CAPTION}
                        style={styles.supportingText}
                    >
                        {LOCATION} | Lviv | {EXPERIENCE_YEARS} year(s) of
                        experience |
                    </Text>
                    <Text
                        category={TextCategory.CAPTION}
                        style={styles.supportingText}
                    >
                        {ENGLISH_LEVEL} | {PUBLISHED}
                    </Text>
                </View>
            </View>
            <View style={[styles.divider, globalStyles.width100]} />
            <View style={[globalStyles.pv20, globalStyles.ph15]}>
                <Text>BADGES</Text>
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
                {HARD_SKILLS.slice(0, maxSkills).map((skill) => (
                    <Tag key={skill} value={skill} />
                ))}
            </View>
            <View style={[globalStyles.pb20, globalStyles.ph15]}>
                <Text category={TextCategory.BODY1}>
                    {DESCRIPTION.slice(0, maxCharCount)}...
                </Text>
            </View>
            <View style={[styles.divider, globalStyles.width100]} />
            <Button
                label="Read more"
                style={[globalStyles.alignSelfFlexEnd, globalStyles.m10]}
                onPress={(): number => ID} // TODO redirect to certain candidate
            />
        </View>
    );
};

export { CandidateCard };
