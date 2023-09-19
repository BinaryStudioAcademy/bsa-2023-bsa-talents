import React from 'react';

import {
    MaterialIcon,
    Pressable,
    Text,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type DrawerNavigationProp,
    type ParamListBase,
} from '~/bundles/common/types/types';

import { styles } from './styles';

type Properties = {
    navigation: DrawerNavigationProp<ParamListBase>;
};

const Header: React.FC<Properties> = ({ navigation: { openDrawer } }) => {
    return (
        <View
            style={[
                styles.header,
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                globalStyles.justifyContentCenter,
            ]}
        >
            <Pressable style={styles.icon} onPress={openDrawer}>
                <MaterialIcon name="menu" size={30} color="#fff" />
            </Pressable>
            <Text category={TextCategory.H5} style={styles.title}>
                Create an account
            </Text>
            <View
                style={[
                    styles.steps,
                    globalStyles.alignItemsCenter,
                    globalStyles.justifyContentCenter,
                ]}
            >
                <Text category={TextCategory.CAPTION} style={styles.stepsText}>
                    STEPS
                </Text>
            </View>
        </View>
    );
};

export { Header };
