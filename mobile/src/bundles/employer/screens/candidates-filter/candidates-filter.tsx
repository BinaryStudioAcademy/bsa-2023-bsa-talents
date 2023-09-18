import React from 'react';

import { ScrollView } from '~/bundles/common/components/components';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { CandidatesFilterForm } from '~/bundles/employer/components/components';

const CandidatesFilter: React.FC = () => {
    const handleFormSubmit = useCallback((): void => {
        // TODO: handle submit
    }, []);

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
