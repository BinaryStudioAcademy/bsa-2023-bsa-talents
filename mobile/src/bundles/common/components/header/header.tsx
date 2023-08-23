import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './styles';

const Header = (): JSX.Element => {
    return (
        <View
            style={[
                styles.header,
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                globalStyles.justifyContentCenter,
            ]}
        >
            <Text style={styles.icon}>ICON</Text>
            <Text
                category="H5"
                style={[{ color: '#fff' }, globalStyles.alignSelfCenter]}
            >
                Create an account
            </Text>
            <View
                style={[
                    styles.steps,
                    globalStyles.alignItemsCenter,
                    globalStyles.justifyContentCenter,
                ]}
            >
                <Text category="H6" style={styles.stepsText}>
                    STEPS
                </Text>
            </View>
        </View>
    );
};

export { Header };
