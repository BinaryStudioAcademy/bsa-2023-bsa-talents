import React from 'react';

import { Overlay, ScrollView } from '~/bundles/common/components/components';
import { DataStatus } from '~/bundles/common/enums/enums';
import { useAppSelector, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { CandidatesFilterForm } from '~/bundles/employer/components/components';

const CandidatesFilter: React.FC = () => {
    const commonDataStatus = useAppSelector(
        ({ commonData }) => commonData.dataStatus,
    );

    const handleFormSubmit = useCallback((): void => {
        // TODO: handle submit
    }, []);

    const handleFilterClose = useCallback((): void => {
        // TODO: navigate to Candidates page
    }, []);

    const isCommonDataLoading = commonDataStatus === DataStatus.PENDING;

    return (
        <>
            <Overlay isActive={isCommonDataLoading} />
            <ScrollView
                persistentScrollbar
                style={[
                    globalStyles.defaultScreenPadding,
                    globalStyles.borderRadius10,
                    globalStyles.width100,
                    globalStyles.height100,
                ]}
            >
                <CandidatesFilterForm
                    onSubmit={handleFormSubmit}
                    onFilterClose={handleFilterClose}
                />
            </ScrollView>
        </>
    );
};

export { CandidatesFilter };
