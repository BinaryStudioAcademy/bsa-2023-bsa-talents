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

import { FeedbacksContainer } from '../feedbacks-container/feedbacks-container';
import { ProjectContainer } from '../project-container/project-container';
import { ScoresAndSkillsContainer } from '../scores-and-skills-container/scores-and-skills-container';
import { styles } from './styles';

const tabs = Object.values(ProfileTab);

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
                {tabs.map((profileTab: Tab) => {
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
                    <ScoresAndSkillsContainer
                        badges={badges}
                        skills={hardSkills}
                    />
                )}
                {tab === ProfileTab.FEEDBACKS && (
                    <FeedbacksContainer
                        personalityTypes={personalType}
                        HRBadges={HRBadges}
                    />
                )}
                {tab === ProfileTab.PROJECT && <ProjectContainer />}
            </View>
        </>
    );
};

export { PreviewTabs };
