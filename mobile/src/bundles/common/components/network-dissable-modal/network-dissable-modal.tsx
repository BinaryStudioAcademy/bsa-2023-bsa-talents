import NetInfo from '@react-native-community/netinfo';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text, View } from '~/bundles/common/components/components';
import { IconName, TextCategory } from '~/bundles/common/enums/enums';
import { useEffect, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './styles';

const NetworkDisableModal: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            const isOnline = !(state.isConnected && state.isInternetReachable);
            setIsConnected(isOnline);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    if (!isConnected) {
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

export { NetworkDisableModal };
