import { StyleSheet } from 'react-native';

const primaryButton = {};
const primaryButtonPressed = {};
const secondaryButtonPressed = {};
const secondaryButton = {};
const primaryButtonDisabled = {};
const secondaryButtonDisabled = {};
const buttonWithIcon = {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    gap: 10,
};
const buttonWithIconDisabled = {};
const buttonWithIconPressed = {};

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 15,
        paddingHorizontal: 37,
        alignItems: 'center',
    },
    label: {
        color: 'white',
    },
    button_primary: primaryButton,
    button_secondary: secondaryButton,
    button_primary_pressed: primaryButtonPressed,
    button_secondary_pressed: secondaryButtonPressed,
    button_primary_disabled: primaryButtonDisabled,
    button_secondary_disabled: secondaryButtonDisabled,
    button_with_icon: buttonWithIcon,
    button_with_icon_disabled: buttonWithIconDisabled,
    button_with_icon_pressed: buttonWithIconPressed,
});

export { styles };
