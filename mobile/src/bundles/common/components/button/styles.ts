import { StyleSheet } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    button: {
        borderColor: 'transparent',
        borderWidth: 2,
        fontWeight: 500,
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
        fontWeight: 600,
        borderRadius: 24,
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
