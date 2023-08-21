import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
    type FontAwesomeIconStyle,
    type Props,
} from '@fortawesome/react-native-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import {
    type PressableProps,
    type StyleProp,
    type ViewStyle,
} from 'react-native';

import { Text } from '~/bundles/common/components/components';

import { styles } from './styles';

type Properties = {
    label?: string;
    isPrimary?: boolean;
    labelStyles?: StyleProp<ViewStyle>;
    icon?: IconDefinition;
    iconProps?: Omit<Props, 'icon'>;
} & PressableProps;

type StyleRecord = Record<string, unknown>;

const Button: React.FC<Properties> = ({
    label = '',
    labelStyles,
    style,
    isPrimary = true,
    disabled = false,
    icon,
    iconProps,
    ...properties
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const isPrimaryDisabled = isPrimary && disabled && !icon;
    const isSecondaryDisabled = !isPrimary && disabled && !icon;
    const isIconDisabled = icon && disabled;

    const calculateButtonStyle = useCallback((): StyleRecord[] => {
        const isPrimaryPressed = isPrimary && isPressed && !icon;
        const isSecondaryPressed = !isPrimary && isPressed && !icon;
        const isIconPressed = isPressed && icon;
        const stylesData = [
            styles.button,
            isPrimary ? styles.button_primary : styles.button_secondary,
            icon && styles.button_with_icon,
            isPrimaryDisabled && styles.button_primary_disabled,
            isSecondaryDisabled && styles.button_secondary_disabled,
            isIconDisabled && styles.button_with_icon_disabled,
            isPrimaryPressed && styles.button_primary_pressed,
            isSecondaryPressed && styles.button_secondary_pressed,
            isIconPressed && styles.button_with_icon_pressed,
            style,
        ];
        return stylesData.filter(Boolean) as StyleRecord[];
    }, [
        icon,
        isIconDisabled,
        isPressed,
        isPrimary,
        isPrimaryDisabled,
        isSecondaryDisabled,
        style,
    ]);

    const calculateIconStyle = useCallback((): FontAwesomeIconStyle => {
        const isIconPressed = isPressed && icon;
        const stylesData = [
            styles.icon,
            isIconDisabled && styles.icon_disabled,
            isIconPressed && styles.icon_pressed,
        ];
        return stylesData.filter(Boolean).pop() as FontAwesomeIconStyle;
    }, [icon, isIconDisabled, isPressed]);

    const calculateLabelStyle = useCallback((): StyleRecord[] => {
        const isPrimaryPressed = isPrimary && isPressed && !icon;
        const isSecondaryPressed = !isPrimary && isPressed && !icon;
        const isIconPressed = isPressed && icon;
        const stylesData = [
            styles.label,
            isPrimary ? styles.label_primary : styles.label_secondary,
            icon && styles.label_with_icon,
            disabled && styles.label_disabled,
            isPrimaryPressed && styles.label_primary_pressed,
            isSecondaryPressed && styles.label_secondary_pressed,
            isIconPressed && styles.label_with_icon_pressed,
            labelStyles,
        ];
        return stylesData.filter(Boolean) as StyleRecord[];
    }, [disabled, icon, isPressed, isPrimary, labelStyles]);

    const togglePressed = useCallback(() => {
        setIsPressed((previous) => !previous);
    }, []);

    return (
        <Pressable
            onPressIn={togglePressed}
            onPressOut={togglePressed}
            {...properties}
            disabled={disabled}
            style={calculateButtonStyle()}
        >
            {icon && (
                <FontAwesomeIcon
                    size={15}
                    icon={icon}
                    style={calculateIconStyle()}
                    {...iconProps}
                />
            )}
            <Text style={calculateLabelStyle()}>{label}</Text>
        </Pressable>
    );
};

export { Button };
