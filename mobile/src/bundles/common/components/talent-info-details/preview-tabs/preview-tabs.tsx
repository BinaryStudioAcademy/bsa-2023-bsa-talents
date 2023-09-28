import React from 'react';

import {
    Loader,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { DataStatus, TextCategory } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import { loadLMSData } from '~/bundles/common-data/store/actions';
import {
    FeedbacksContainer,
    ProjectContainer,
    ScoresAndSkillsContainer,
} from '~/bundles/talent/components/components';
import { ProfileTab } from '~/bundles/talent/enums/enums';

import { styles } from './styles';

type Tab = ValueOf<typeof ProfileTab>;

const tabs = Object.values(ProfileTab);

type PreviewTabsProperties = {
    userId?: string;
};

const PreviewTabs: React.FC<PreviewTabsProperties> = ({ userId = '' }) => {
    const [tab, setTab] = useState<Tab>(ProfileTab.SCORES_SKILLS);
    const { dataStatus } = useAppSelector(({ commonData }) => commonData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(loadLMSData({ userId }));
    }, [dispatch, userId]);

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

    const isDataLoading = dataStatus === DataStatus.PENDING;

    return (
        <>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                ]}
            >
                {isDataLoading ? (
                    <Loader />
                ) : (
                    tabs.map((profileTab: Tab) => {
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
                    })
                )}
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
