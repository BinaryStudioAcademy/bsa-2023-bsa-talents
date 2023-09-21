import React from 'react';

import { ScrollView } from '~/bundles/common/components/components';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks';
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

    const handleFilterClose = useCallback((): void => {
        // TODO: navigate to Candidates page
    }, []);

    return (
        <ScrollView
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
    );
};

export { CandidatesFilter };
