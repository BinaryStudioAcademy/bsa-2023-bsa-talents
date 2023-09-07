import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';
import { SearchCandidatesFilter } from '~/bundles/employer/components/components';

const Candidates: React.FC = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const onSearchHandler = (payload: unknown): unknown => {
        return payload;
    };
    return (
        <View style={globalStyles.flex1}>
            <SearchCandidatesFilter onSubmit={onSearchHandler} />
            <Text>Employer screen: Candidates</Text>
        </View>
    );
};

export { Candidates };
