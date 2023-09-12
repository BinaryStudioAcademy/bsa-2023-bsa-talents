import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    numberOfUsers?: number;
};

const CandidatesHeader: React.FC<Properties> = ({ numberOfUsers }) => {
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
                category={TextCategory.LABEL}
                style={[
                    styles.talentsNumber,
                    globalStyles.borderRadius10,
                    globalStyles.alignSelfCenter,
                    globalStyles.ph10,
                    globalStyles.mt5,
                ]}
            >
                {numberOfUsers}
            </Text>
        </View>
    );
};

export { CandidatesHeader };
