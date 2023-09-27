import React from 'react';

import {
    LogoutButton,
    Text,
    View,
} from '~/bundles/common/components/components';
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
                globalStyles.pr10,
                globalStyles.flexDirectionRow,
                globalStyles.justifyContentSpaceBetween,
                globalStyles.alignItemsCenter,
                styles.container,
            ]}
        >
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <Text category={TextCategory.H3}>Candidates</Text>
                {!!numberOfUsers && (
                    <Text
                        category={TextCategory.LABEL}
                        style={[
                            styles.talentsNumber,
                            globalStyles.borderRadius10,
                            globalStyles.alignSelfCenter,
                            globalStyles.ph10,
                            globalStyles.mt5,
                            globalStyles.ml5,
                        ]}
                    >
                        {numberOfUsers}
                    </Text>
                )}
            </View>
            <LogoutButton />
        </View>
    );
};

export { CandidatesHeader };
