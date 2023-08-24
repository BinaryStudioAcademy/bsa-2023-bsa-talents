import { type DrawerNavigationProp } from '@react-navigation/drawer';
import { type ParamListBase } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Pressable, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './styles';

type Header = {
    navigation: DrawerNavigationProp<ParamListBase>;
};

const Header = ({ navigation }: Header): JSX.Element => {
    return (
        <View
            style={[
                styles.header,
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                globalStyles.justifyContentCenter,
            ]}
        >
            <Pressable
                style={styles.icon}
                onPress={(): void => {
                    navigation.openDrawer();
                }}
            >
                <Icon name="menu" size={30} color="#fff" />
            </Pressable>
            <Text category={TextCategory.H5} style={{ color: '#fff' }}>
                Create an account
            </Text>
            <View
                style={[
                    styles.steps,
                    globalStyles.alignItemsCenter,
                    globalStyles.justifyContentCenter,
                ]}
            >
                <Text category={TextCategory.H6} style={styles.stepsText}>
                    STEPS
                </Text>
            </View>
        </View>
    );
};

export { Header };
