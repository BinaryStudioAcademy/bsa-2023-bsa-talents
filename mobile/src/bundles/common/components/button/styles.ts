import { StyleSheet } from 'react-native';

import { Color } from '../../enums/enums';

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 37,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 5,
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
    button_primary: {
        backgroundColor: Color.PRIMARY,
    },
    button_secondary: {
        backgroundColor: '#FFFFFF',
        borderColor: Color.PRIMARY,
    },
    button_primary_pressed: {
        backgroundColor: Color.BUTTON_PRESSED,
    },
    button_secondary_pressed: {
        borderColor: Color.BUTTON_PRESSED,
    },
    button_with_icon_pressed: {
        color: Color.BUTTON_PRESSED,
    },
    button_primary_disabled: {
        backgroundColor: Color.BACKGROUND,
    },
    button_secondary_disabled: {
        backgroundColor: '#FFFFFF',
        borderColor: Color.INPUT,
    },
    button_with_icon: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        color: Color.PRIMARY,
        borderRadius: 24,
        fontSize: 13,
        fontFamily: 600,
    },
    icon: {
        color: Color.PRIMARY,
    },
    content_disabled: {
        color: Color.BUTTON_DISABLED,
    },
});

export { styles };
