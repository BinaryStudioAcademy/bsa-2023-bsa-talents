import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pressable, Text, View } from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    stepNumber: number;
    isFocused: boolean;
    isCompleted: boolean;
    disabled: boolean;
    routeName: string;
    onPress: () => void;
};

const Step: React.FC<Properties> = ({
    stepNumber,
    onPress,
    isFocused,
    isCompleted,
    disabled,
    routeName,
}) => {
    const number = 1;
    // prettier-ignore
    return (
        <Pressable
            key={stepNumber}
            onPress={onPress}
            disabled={disabled}
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                globalStyles.m25,
                styles.singleStep,
            ]}
        >
            {isCompleted ? (
                <Icon
                    name={IconName.CHECK_CIRCLE}
                    color={Color.PRIMARY}
                    size={30}
                />
            ) : (isFocused ? (
                <Icon
                    name={IconName.CIRCLE_OUTLINE}
                    color={Color.PRIMARY}
                    size={30}
                    style={styles.activeIcon}
                />
            ) : (
                <Icon name={IconName.CIRCLE} color={Color.INPUT} size={30} />
            ))}
            <View style={[globalStyles.mr15, styles.textCon]}>
                <Text category={TextCategory.STEP} style={styles.step}>
                    Step 0{stepNumber + number}
                </Text>
                <Text
                    category={TextCategory.MENU}
                    style={[
                        styles.screenName,
                        (isFocused || isCompleted) && styles.activeScreenName,
                    ]}
                >
                    {routeName}
                </Text>
            </View>
        </Pressable>
    );
};

export { Step };
