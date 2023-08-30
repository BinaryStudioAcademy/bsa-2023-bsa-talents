import { type DrawerNavigationProp } from '@react-navigation/drawer';
import { type ParamListBase } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Pressable, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

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
                <Icon name="menu" size={30} color="#fff" />
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
                <Text category={TextCategory.LABEL} style={styles.stepsText}>
                    STEPS
                </Text>
            </View>
        </View>
    );
};

export { Header };
