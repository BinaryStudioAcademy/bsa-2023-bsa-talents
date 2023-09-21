import React from 'react';

import { Overlay, ScrollView } from '~/bundles/common/components/components';
import { DataStatus } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { CandidatesFilterForm } from '~/bundles/employer/components/components';
import { getFilteredTalents } from '~/bundles/employer/store/actions';
import { type UserDetailsSearchUsersRequestDto } from '~/bundles/employer/types/types';

const CandidatesFilter: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleFormSubmit = useCallback(
        (payload: UserDetailsSearchUsersRequestDto): void => {
            void dispatch(getFilteredTalents(payload));
        },
        [dispatch],
    );
    const commonDataStatus = useAppSelector(
        ({ commonData }) => commonData.dataStatus,
    );

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
