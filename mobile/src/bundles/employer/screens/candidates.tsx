import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';

const Candidates: React.FC = () => {
    return (
        <View style={globalStyles.flex1}>
            <Text>Employer screen: Candidates</Text>
        </View>
    );
};

export { Candidates };
