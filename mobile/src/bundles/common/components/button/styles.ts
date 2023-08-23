import { StyleSheet } from 'react-native';

import { Color } from '../../enums/enums';

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 37,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        fontSize: 15,
        fontWeight: '500',
        borderColor: 'transparent',
    },
    label: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: '500',
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
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        color: Color.PRIMARY,
        borderRadius: 24,
        fontSize: 13,
        fontFamily: 600,
    },
    content_disabled: {
        color: Color.BUTTON_DISABLED,
    },
});

export { styles };
