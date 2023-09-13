import React, { useState } from 'react';
import { type ValueOf } from 'shared/build/index';

import {
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type BsaBadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';
import { ProfileTab } from '~/bundles/talent/enums/enums';

import { Feedbacks } from '../feedbacks/feedbacks';
import { Project } from '../project/project';
import { ScoresAndSkills } from '../scores-and-skills/scores-and-skills';
import { styles } from './styles';

type Tab = ValueOf<typeof ProfileTab>;

type Badge = {
    label: ValueOf<typeof BsaBadgeStepBadgesTitle>;
    value: number;
};

//todo change to real types
type Properties = {
    badges: Badge[];
    hardSkills: string[];
    personalType: string[];
    HRBadges: string[];
};

const PreviewTabs = ({
    badges,
    hardSkills,
    personalType,
    HRBadges,
}: Properties): JSX.Element => {
    const [tab, setTab] = useState<Tab>(ProfileTab.SCORES_SKILLS);
    return (
        <>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                ]}
            >
                {Object.values(ProfileTab).map((profileTab: Tab) => {
                    return (
                        <TouchableOpacity
                            key={profileTab}
                            onPress={(): void => {
                                setTab(profileTab);
                            }}
                        >
                            <Text
                                category={TextCategory.LABEL}
                                style={tab === profileTab && styles.active}
                            >
                                {profileTab}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View
                style={[
                    styles.scoreAndSkillsWrapper,
                    globalStyles.borderRadius10,
                    globalStyles.mv20,
                    globalStyles.pv20,
                    globalStyles.ph15,
                ]}
            >
                {tab === ProfileTab.SCORES_SKILLS && (
                    <ScoresAndSkills badges={badges} skills={hardSkills} />
                )}
                {tab === ProfileTab.FEEDBACKS && (
                    <Feedbacks
                        personalityType={personalType}
                        HRBadges={HRBadges}
                    />
                )}
                {tab === ProfileTab.PROJECT && <Project />}
            </View>
        </>
    );
};

export { PreviewTabs };
