import React from 'react';

import {
    CommunityIcon,
    Text,
    View,
} from '~/bundles/common/components/components';
import { IconName, TextCategory } from '~/bundles/common/enums/enums';
import { useNetInfo } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

const LostConnectionModal: React.FC = () => {
    const { isConnected, isInternetReachable } = useNetInfo();
    const isConnectionLost = !isConnected && !isInternetReachable;

    if (!isConnectionLost) {
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
                    globalStyles.justifyContentCenter,
                    globalStyles.m25,
                    globalStyles.pv10,
                    globalStyles.ph25,
                    globalStyles.borderRadius10,
                ]}
            >
                <CommunityIcon
                    style={globalStyles.mr10}
                    name={IconName.WIFI_OFF}
                    size={25}
                    color={'#fff'}
                />
                <Text style={styles.message} category={TextCategory.MENU}>
                    No connection to the server
                </Text>
            </View>
        </View>
    );
};

export { LostConnectionModal };
