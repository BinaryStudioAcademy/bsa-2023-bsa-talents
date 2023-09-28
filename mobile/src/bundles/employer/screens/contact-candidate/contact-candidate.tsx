import React from 'react';

import { ScrollView } from '~/bundles/common/components/components';
import { useCallback, useNavigation } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type NavigationProp,
    type RootNavigationParameterList,
} from '~/bundles/common/types/types';
import { ContactCandidateForm } from '~/bundles/employer/components/components';

const ContactCandidate: React.FC = () => {
    const navigation =
        useNavigation<NavigationProp<RootNavigationParameterList>>();

    const handleFormSubmit = useCallback((): void => {
        // navigation.navigate(RootScreenName.CHAT, { chatId: id.talendId });
        // :TODO handle start conversation
    }, []);

    const handleContactClose = useCallback((): void => {
        navigation.goBack();
    }, [navigation]);

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
