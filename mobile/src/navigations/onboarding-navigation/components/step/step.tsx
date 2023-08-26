import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pressable, Text, View } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    index: number;
    isFocused: boolean;
    routeName: string;
    onPress: () => void;
};

const Step: React.FC<Properties> = ({
    index,
    onPress,
    isFocused,
    routeName,
}) => {
    const number = 1;
    return (
        <Pressable
            key={index}
            onPress={onPress}
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                globalStyles.m25,
                styles.singleStep,
            ]}
        >
            {isFocused ? (
                <Icon
                    name="circle-outline"
                    color={Color.PRIMARY}
                    size={30}
                    style={styles.activeIcon}
                />
            ) : (
                <Icon name="circle" color={Color.INPUT} size={30} />
            )}
            <View style={[globalStyles.mr15, styles.textCon]}>
                <Text category="Label" style={styles.step}>
                    Step 0{index + number}
                </Text>
                <Text
                    category="Menu"
                    style={[
                        styles.screenName,
                        isFocused && styles.activeScreenName,
                    ]}
                >
                    {routeName}
                </Text>
            </View>
        </Pressable>
    );
};

export { Step };
