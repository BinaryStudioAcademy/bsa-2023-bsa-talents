import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { type Props } from '@fortawesome/react-native-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
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
    const isPrimaryDisabled = isPrimary && disabled && !icon;
    const isSecondaryDisabled = !isPrimary && disabled && !icon;
    const isIconDisabled = icon && disabled;

    const calculateButtonStyle = ({
        pressed,
    }: {
        pressed: boolean;
    }): StyleRecord[] => {
        const isPrimaryPressed = isPrimary && pressed && !icon;
        const isSecondaryPressed = !isPrimary && pressed && !icon;
        const isIconPressed = pressed && icon;
        const stylesData = [
            styles.btn,
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
    };

    return (
        <Pressable
            {...properties}
            disabled={disabled}
            style={calculateButtonStyle}
        >
            {icon && <FontAwesomeIcon size={15} icon={icon} {...iconProps} />}
            <Text style={(styles.label, labelStyles)}>{label}</Text>
        </Pressable>
    );
};

export { Button };
