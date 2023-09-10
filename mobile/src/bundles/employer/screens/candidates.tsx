import React from 'react';

import { View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';

import { CandidatesHeader } from '../components/components';

const Candidates: React.FC = () => {
    return (
        <View style={globalStyles.flex1}>
            <CandidatesHeader />
        </View>
    );
};

export { Candidates };
