import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pressable, Text, View } from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { useMemo } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type StepState = {
    FOCUSED: boolean;
    COMPLETED: boolean;
    DISABLED: boolean;
};

type Properties = {
    stepNumber: number;
    stepState: StepState;
    routeName: string;
    onPress: () => void;
};

const Step: React.FC<Properties> = ({
    stepNumber,
    onPress,
    routeName,
    stepState,
}) => {
    const number = 1;

    const stepIcon = useMemo(() => {
        if (stepState.COMPLETED) {
            return {
                name: IconName.CHECK_CIRCLE,
                color: Color.PRIMARY,
            };
        } else if (stepState.FOCUSED) {
            return {
                name: IconName.CIRCLE_OUTLINE,
                color: Color.PRIMARY,
                style: styles.activeIcon,
            };
        } else {
            return {
                name: IconName.CIRCLE,
                color: Color.INPUT,
            };
        }
    }, [stepState]);

    return (
        <Pressable
            key={stepNumber}
            onPress={onPress}
            disabled={stepState.DISABLED}
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                globalStyles.m25,
                styles.singleStep,
            ]}
        >
            <Icon
                name={stepIcon.name}
                color={stepIcon.color}
                size={30}
                style={stepIcon.style}
            />
            <View style={[globalStyles.mr15, styles.textCon]}>
                <Text category={TextCategory.STEP} style={styles.step}>
                    Step 0{stepNumber + number}
                </Text>
                <Text
                    category={TextCategory.MENU}
                    style={[
                        styles.screenName,
                        (stepState.FOCUSED || stepState.COMPLETED) &&
                            styles.activeScreenName,
                    ]}
                >
                    {routeName}
                </Text>
            </View>
        </Pressable>
    );
};

export { Step };
