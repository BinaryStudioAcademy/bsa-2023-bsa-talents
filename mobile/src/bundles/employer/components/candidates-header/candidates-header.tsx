import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

const CandidatesHeader: React.FC = () => {
    return (
        <View
            style={[
                globalStyles.p25,
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                styles.container,
            ]}
        >
            <Text category={TextCategory.H3}>Candidates</Text>
            <Text
                category={TextCategory.STEP}
                style={[
                    styles.talentsNumber,
                    globalStyles.borderRadius10,
                    globalStyles.alignSelfCenter,
                    globalStyles.ph5,
                ]}
            >
                63
            </Text>
        </View>
    );
};

export { CandidatesHeader };
