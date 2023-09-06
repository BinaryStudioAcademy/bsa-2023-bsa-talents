import React, { useState } from 'react';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { SELECTOR_STYLE } from './constants/constants';
import { styles } from './styles';

type Select = {
    label: string;
    value: string;
};

type Properties = {
    options: Select[];
    onSelect?: (item: Select) => void;
};

const { INITIAL_DROPDOWN_HEIGHT, MAX_DROPDOWN_HEIGHT, ICON_SIZE } =
    SELECTOR_STYLE;

const Selector: React.FC<Properties> = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isListVisible, setIsListVisible] = useState(false);
    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: withTiming(isListVisible ? '180deg' : '0deg') },
            ],
        };
    });

    const heightAnimatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(
                isListVisible ? MAX_DROPDOWN_HEIGHT : INITIAL_DROPDOWN_HEIGHT,
                { duration: 400 },
            ),
        };
    });

    const toggleIsListVisible = (): void => {
        setIsListVisible((previous) => !previous);
    };

    const handlePressItem = (option: Select): void => {
        toggleIsListVisible();
        setSelectedOption(option.label);
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={[
                    globalStyles.pv10,
                    globalStyles.pl15,
                    globalStyles.pr5,
                    globalStyles.borderRadius5,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.dropdownButton,
                ]}
                onPress={toggleIsListVisible}
            >
                <Text category={TextCategory.LABEL}>{selectedOption}</Text>
                <Animated.View style={iconAnimatedStyle}>
                    <Icon
                        name={IconName.ARROW_DROP_DOWN}
                        size={ICON_SIZE}
                        color={Color.PRIMARY}
                    />
                </Animated.View>
            </Pressable>

            <Animated.View
                style={[
                    globalStyles.pl20,
                    globalStyles.width100,
                    isListVisible && globalStyles.pb5,
                    styles.dropdownButton,
                    !isListVisible && styles.dropdownClosed,
                    heightAnimatedStyle,
                ]}
            >
                <ScrollView nestedScrollEnabled>
                    {options.map((item) => (
                        <TouchableOpacity
                            key={item.value}
                            onPress={(): void => {
                                handlePressItem(item);
                            }}
                        >
                            <Text
                                category={TextCategory.LABEL}
                                style={globalStyles.pv5}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>
        </View>
    );
};

export { Selector };
