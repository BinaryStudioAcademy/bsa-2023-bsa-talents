import React from 'react';

import { StatusBar, View } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { CandidatesHeader, SearchTalents } from '../components/components';

const Candidates: React.FC = () => {
    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <View
                style={[
                    globalStyles.flex1,
                    { backgroundColor: Color.BACKGROUND },
                ]}
            >
                <CandidatesHeader />
                <SearchTalents />
            </View>
        </>
    );
};

export { Candidates };
