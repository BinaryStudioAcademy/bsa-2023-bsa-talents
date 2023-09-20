import React from 'react';

import { ScrollView } from '~/bundles/common/components/components';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { ContactCandidateForm } from '~/bundles/employer/components/components';

const ContactCandidate: React.FC = () => {
    const handleFormSubmit = useCallback((): void => {
        // TODO: handle submit
    }, []);

    const handleContactClose = useCallback((): void => {
        // TODO: navigate to Candidate details page
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
            <ContactCandidateForm
                onContactClose={handleContactClose}
                onSubmit={handleFormSubmit}
            />
        </ScrollView>
    );
};

export { ContactCandidate };
