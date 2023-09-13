import React from 'react';
import { type ValueOf } from 'shared/build/index';

import {
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useMemo, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type BsaBadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';
import { ProfileTab } from '~/bundles/talent/enums/enums';

import { FeedbacksContainer } from '../feedbacks-container/feedbacks-container';
import { ProjectContainer } from '../project-container/project-container';
import { ScoresAndSkillsContainer } from '../scores-and-skills-container/scores-and-skills-container';
import { styles } from './styles';

const tabs = Object.values(ProfileTab);

type Tab = ValueOf<typeof ProfileTab>;
type BadgeName = ValueOf<typeof BsaBadgeStepBadgesTitle>;

//todo change to real types
type Properties = {
    badges: BadgeName[];
    hardSkills?: {
        value: string;
        label: string;
    }[];
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

    const selectTab = useMemo(() => {
        switch (tab) {
            case ProfileTab.FEEDBACKS: {
                return (
                    <FeedbacksContainer
                        personalityTypes={personalType}
                        HRBadges={HRBadges}
                    />
                );
            }
            case ProfileTab.PROJECT: {
                return <ProjectContainer />;
            }
            default: {
                return (
                    <ScoresAndSkillsContainer
                        badges={badges}
                        skills={hardSkills}
                    />
                );
            }
        }
    }, [HRBadges, badges, hardSkills, personalType, tab]);

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
                {selectTab}
            </View>
        </>
    );
};

export { PreviewTabs };
