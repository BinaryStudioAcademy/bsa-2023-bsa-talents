import React, { useMemo } from 'react';
import {
    type PressableProps,
    type StyleProp,
    type TextStyle,
    type ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Pressable, Text } from '~/bundles/common/components/components';
import { ButtonType, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';

import { styles } from './styles';

type StylesProperties = {
    basic: StyleProp<ViewStyle>;
    pressed: StyleProp<ViewStyle | TextStyle>;
    disabled: StyleProp<ViewStyle | TextStyle>;
    label: StyleProp<ViewStyle | TextStyle>;
};

type ButtonName = ValueOf<typeof ButtonType>;

type Properties = {
    label: string;
    buttonType?: ButtonName;
    iconName?: string;
    iconSize?: number;
} & PressableProps;

const iconDefaultSize = 32;

const Button: React.FC<Properties> = ({
    label,
    style: pressableStyle,
    iconName,
    iconSize = iconDefaultSize,
    buttonType = ButtonType.FILLED,
    disabled = false,
    ...props
}) => {
    const componentStyles: Record<ButtonName, StylesProperties> =
        useMemo(() => {
            return {
                [ButtonType.FILLED]: {
                    basic: styles.button_filled,
                    pressed: styles.button_filled_pressed,
                    disabled: styles.button_filled_disabled,
                    label: styles.label,
                },
                [ButtonType.OUTLINE]: {
                    basic: styles.button_outline,
                    pressed: styles.button_outline_pressed,
                    disabled: styles.button_outline_disabled,
                    label: styles.content_pressed,
                },
                [ButtonType.GHOST]: {
                    basic: styles.button_ghost,
                    pressed: styles.button_ghost_pressed,
                    disabled: styles.content_disabled,
                    label: styles.content_pressed,
                },
            };
        }, []);
    const isFilledButton = ButtonType.FILLED === buttonType;
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }): StyleProp<ViewStyle> => [
                iconName
                    ? globalStyles.flexDirectionRow
                    : globalStyles.borderRadius5,
                globalStyles.pv10,
                globalStyles.ph25,
                globalStyles.alignItemsCenter,
                globalStyles.justifyContentCenter,
                styles.button,
                componentStyles[buttonType].basic,
                pressed && componentStyles[buttonType].pressed,
                disabled && componentStyles[buttonType].disabled,
                pressableStyle as StyleProp<ViewStyle>,
            ]}
            {...props}
        >
            {({ pressed }): JSX.Element => (
                <>
                    {iconName && (
                        <Icon
                            name={iconName}
                            size={iconSize}
                            style={[
                                styles.icon,
                                globalStyles.mr5,
                                pressed && styles.button_ghost_pressed,
                                disabled && styles.content_disabled,
                            ]}
                        />
                    )}
                    <Text
                        category={TextCategory.BUTTON}
                        style={[
                            isFilledButton
                                ? styles.label
                                : styles.label_secondary,
                            pressed && componentStyles[buttonType].label,
                            disabled && styles.content_disabled,
                        ]}
                    >
                        {label}
                    </Text>
                </>
            )}
        </Pressable>
    );
};

export { Button };
