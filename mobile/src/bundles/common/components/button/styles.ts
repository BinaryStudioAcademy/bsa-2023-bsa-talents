import { StyleSheet } from 'react-native';

import { Color } from '../../enums/enums';

const borderWidth = 2;
const ghostIconRadius = 24;

const styles = StyleSheet.create({
    button: {
        borderColor: 'transparent',
        borderWidth: borderWidth,
    },
    label: {
        color: '#FFFFFF',
    },
    label_secondary: {
        color: Color.PRIMARY,
    },
    content_pressed: {
        color: Color.BUTTON_PRESSED,
    },
    button_filled: {
        backgroundColor: Color.PRIMARY,
    },
    button_outline: {
        backgroundColor: '#FFFFFF',
        borderColor: Color.PRIMARY,
    },
    button_filled_pressed: {
        backgroundColor: Color.BUTTON_PRESSED,
    },
    button_outline_pressed: {
        borderColor: Color.BUTTON_PRESSED,
    },
    button_ghost_pressed: {
        color: Color.BUTTON_PRESSED,
    },
    button_filled_disabled: {
        backgroundColor: Color.BACKGROUND,
    },
    button_outline_disabled: {
        backgroundColor: '#FFFFFF',
        borderColor: Color.INPUT,
    },
    button_ghost: {
        backgroundColor: '#FFFFFF',
        borderRadius: ghostIconRadius,
        color: Color.PRIMARY,
    },
    content_disabled: {
        color: Color.BUTTON_DISABLED,
    },
    icon: {
        color: Color.PRIMARY,
    },
});

export { styles };
