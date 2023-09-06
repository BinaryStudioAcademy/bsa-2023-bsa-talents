import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text, View } from '~/bundles/common/components/components';
import { IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

const LostConnectionModal: React.FC = () => {
    const { isConnected, isInternetReachable } = useNetInfo();
    const isConnectionLos = !isConnected && !isInternetReachable;

    if (!isConnectionLos) {
        return null;
    }

    return (
        <View
            pointerEvents="box-only"
            style={[
                globalStyles.width100,
                globalStyles.height100,
                styles.wrapper,
            ]}
        >
            <View
                style={[
                    styles.container,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignItemsCenter,
                    globalStyles.m25,
                    globalStyles.p10,
                    globalStyles.borderRadius10,
                    globalStyles.justifyContentSpaceAround,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <Icon name={IconName.WIFI_OFF} size={25} color={'#fff'} />
                <Text style={styles.message} category={TextCategory.MENU}>
                    Internet connection error
                </Text>
            </View>
        </View>
    );
};

export { LostConnectionModal };
