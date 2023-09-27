import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

const CandidateDetails: React.FC = () => {
    // const route = useAppRoute();
    // const { userId, cvId, jobTitle } = route.params as UserDetailsResponseDto;
    return (
        <View style={globalStyles.flex1}>
            <Text category={TextCategory.H3}>Details</Text>
        </View>
    );
};

export { CandidateDetails };
