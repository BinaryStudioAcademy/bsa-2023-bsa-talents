import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text, View } from '~/bundles/common/components/components';
import { IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './styles';

type Properties = {
    value: string;
    description: string;
    badgeType: string;
    iconSize?: number;
};

const defaultIconSize = 40;

const Badge: React.FC<Properties> = () => {
    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsFlexStart,
                globalStyles.borderRadius9,
                globalStyles.p10,
                globalStyles.m5,
                styles.wrapper,
            ]}
        >
            <View
                style={[
                    globalStyles.p5,
                    globalStyles.borderRadius9,
                    styles.backgroundIcon,
                ]}
            >
                <Icon
                    name={IconName.HEADPHONES}
                    size={defaultIconSize}
                    color="#FFF"
                />
            </View>
            <View style={styles.textWrapper}>
                <View style={globalStyles.flexDirectionRow}>
                    <Text category={TextCategory.H4}>4.2 </Text>
                    <Text category={TextCategory.H4} style={styles.maxScore}>
                        / 5
                    </Text>
                </View>
                <Text category={TextCategory.LABEL}>
                    Your average project score
                </Text>
            </View>
        </View>
    );
};

export { Badge };
