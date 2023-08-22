import React from 'react';
import { Pressable } from 'react-native';
import { type PressableProps } from 'react-native';

import { Text } from '~/bundles/common/components/components';

import { type ButtonType } from '../../enums/enums';
import { styles } from './styles';

type ButtonTypeName = keyof typeof ButtonType;
type StyleRecord = Record<string, unknown>;

type Properties = {
    label: string;
    buttonType?: ButtonTypeName;
} & PressableProps;

const Button: React.FC<Properties> = ({
    label,
    style: pressableStyle,
    buttonType = 'FILLED',
    disabled = false,
    ...props
}) => {
    const buttonStyleChoose: Record<ButtonTypeName, StyleRecord> = {
        FILLED: styles.button_primary,
        OUTLINE: styles.button_secondary,
        GHOST: styles.button_with_icon,
    };
    const buttonStylePressed: Record<ButtonTypeName, StyleRecord> = {
        FILLED: styles.button_primary_pressed,
        OUTLINE: styles.button_secondary_pressed,
        GHOST: styles.button_with_icon_pressed,
    };

    const buttonStyleDisabled: Record<ButtonTypeName, StyleRecord> = {
        FILLED: styles.button_primary_disabled,
        OUTLINE: styles.button_secondary_disabled,
        GHOST: styles.content_disabled,
    };

    const pressedStyleLabel: Record<ButtonTypeName, StyleRecord> = {
        FILLED: styles.label,
        OUTLINE: styles.content_pressed,
        GHOST: styles.content_pressed,
    };

    const isFilledButton = buttonType === 'FILLED';
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }): StyleRecord[] => [
                styles.button,
                buttonStyleChoose[buttonType],
                pressed ? buttonStylePressed[buttonType] : {},
                disabled ? buttonStyleDisabled[buttonType] : {},
                (pressableStyle as StyleRecord | undefined) ?? {},
            ]}
            {...props}
        >
            {({ pressed }): JSX.Element => (
                <>
                    <Text
                        style={[
                            isFilledButton
                                ? styles.label
                                : styles.label_secondary,
                            pressed && pressedStyleLabel[buttonType],
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
