import React from 'react';

import {
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useMemo, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    FeedbacksContainer,
    ProjectContainer,
    ScoresAndSkillsContainer,
} from '~/bundles/talent/components/components';
import { ProfileTab } from '~/bundles/talent/enums/enums';

import { styles } from './styles';

const tabs = Object.values(ProfileTab);

type Tab = ValueOf<typeof ProfileTab>;

const PreviewTabs: React.FC = () => {
    const [tab, setTab] = useState<Tab>(ProfileTab.SCORES_SKILLS);

    const selectTab = useMemo(() => {
        switch (tab) {
            case ProfileTab.FEEDBACKS: {
                return <FeedbacksContainer />;
            }
            case ProfileTab.PROJECT: {
                return <ProjectContainer />;
            }
            default: {
                return <ScoresAndSkillsContainer />;
            }
        }
    }, [tab]);

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
