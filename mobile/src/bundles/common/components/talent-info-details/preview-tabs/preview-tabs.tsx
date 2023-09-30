import React from 'react';

import {
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import {
    CandidateTab,
    ProfileTab,
    TextCategory,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import { loadLMSData } from '~/bundles/common-data/store/actions';
import {
    type CandidateHardSkill,
    type TalentBadge,
} from '~/bundles/employer/types/types';
import {
    FeedbacksContainer,
    ProjectContainer,
    ScoresAndSkillsContainer,
} from '~/bundles/talent/components/components';

import { styles } from './styles';

type CandidateTab = ValueOf<typeof CandidateTab>;

const ProfileTabs = Object.values(ProfileTab);
const CandidateTabs = Object.values(CandidateTab);

type PreviewTabsProperties = {
    userId?: string;
    candidateHardSkill?: CandidateHardSkill;
    isPreview?: boolean;
    badges?: TalentBadge[];
};

const PreviewTabs: React.FC<PreviewTabsProperties> = ({
    userId = '',
    candidateHardSkill,
    isPreview = true,
    badges,
}) => {
    const [tab, setTab] = useState<Partial<CandidateTab>>(
        ProfileTab.SCORES_SKILLS,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(loadLMSData({ userId }));
    }, [dispatch, userId]);

    const selectTab = useMemo(() => {
        switch (tab) {
            case CandidateTab.FEEDBACKS: {
                return <FeedbacksContainer />;
            }
            case CandidateTab.PROJECT: {
                return <ProjectContainer />;
            }
            default: {
                return (
                    <ScoresAndSkillsContainer
                        badges={badges}
                        candidateHardSkill={candidateHardSkill}
                    />
                );
            }
        }
    }, [candidateHardSkill, badges, tab]);

    const tabs = isPreview ? ProfileTabs : CandidateTabs;

    return (
        <>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceAround,
                ]}
            >
                {tabs.map((profileTab: CandidateTab) => {
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
