import React, { useMemo } from 'react';
import { type PressableProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Pressable, Text } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';

import { ButtonType, TextCategory } from '../../enums/enums';
import { styles } from './styles';

type StyleRecord = Record<string, unknown> | undefined | null | false;

type StylesProperties = {
    style: Record<string, unknown>;
    pressed: Record<string, unknown>;
    disabled: Record<string, unknown>;
    label: Record<string, unknown>;
};

type ButtonName = (typeof ButtonType)[keyof typeof ButtonType];

type Properties = {
    label: string;
    iconName?: string;
    iconSize?: number;
    buttonType?: ButtonName;
} & PressableProps;

const iconDefaultSize = 32;

const Button: React.FC<Properties> = ({
    label,
    style: pressAbleStyle,
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
                    style: styles.button_filled,
                    pressed: styles.button_filled_pressed,
                    disabled: styles.button_filled_disabled,
                    label: styles.label,
                },
                [ButtonType.OUTLINE]: {
                    style: styles.button_outline,
                    pressed: styles.button_outline_pressed,
                    disabled: styles.button_outline_disabled,
                    label: styles.content_pressed,
                },
                [ButtonType.GHOST]: {
                    style: styles.button_ghost,
                    pressed: styles.button_ghost_pressed,
                    disabled: styles.content_disabled,
                    label: styles.content_pressed,
                },
            };
        }, []);

    const isFilledButton = buttonType === ButtonType.FILLED;
    const isGhostButton = buttonType === ButtonType.GHOST;
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }): StyleRecord[] => [
                isGhostButton
                    ? (globalStyles.borderRadius24,
                      globalStyles.flexDirectionRow)
                    : globalStyles.borderRadius5,
                globalStyles.pv10,
                globalStyles.ph25,
                globalStyles.alignItemsCenter,
                globalStyles.justifyContentCenter,
                globalStyles.borderWidth2,
                styles.button,
                componentStyles[buttonType].style,
                pressed && componentStyles[buttonType].pressed,
                disabled && componentStyles[buttonType].disabled,
                pressAbleStyle as Record<string, unknown>,
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
