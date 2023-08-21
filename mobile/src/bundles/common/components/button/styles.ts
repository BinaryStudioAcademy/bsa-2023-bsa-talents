import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 37,
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        fontSize: 15,
        fontWeight: '500',
        justifyContent: 'center',
    },
    label: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    label_primary: {
        color: '#FFFFFF',
    },
    label_primary_pressed: {
        color: '#FFFFFF',
    },
    label_disabled: {
        color: '#AAB1BB',
    },
    label_secondary: {
        color: '#274F8D',
    },
    label_secondary_pressed: {
        color: '#2E61AE',
    },
    label_with_icon: {
        color: '#274F8D',
    },
    label_with_icon_pressed: {
        color: '#2E61AE',
    },

    button_primary: {
        backgroundColor: '#274F8D',
        borderColor: '274F8D',
    },
    button_secondary: {
        backgroundColor: '#FFFFFF',
        borderColor: '#274F8D',
    },
    button_primary_pressed: {
        backgroundColor: '#2E61AE',
        borderColor: '#2E61AE',
    },
    button_secondary_pressed: {
        borderColor: '#2E61AE',
    },
    button_primary_disabled: {
        backgroundColor: '#F7F8FC',
        borderColor: '#F7F8FC',
    },
    button_secondary_disabled: {
        backgroundColor: '#FFFFFF',
        borderColor: '#D5DCE8',
    },
    button_with_icon: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        color: '#274F8D',
        borderRadius: 24,
        fontSize: 13,
        fontFamily: 600,
    },
    button_with_icon_pressed: {
        color: '#2E61AE',
        borderRadius: 24,
    },
    button_with_icon_disabled: {
        borderRadius: 24,
    },
    icon: {
        color: '#274F8D',
    },
    icon_pressed: {
        color: '#2E61AE',
    },
    icon_disabled: {
        color: '#AAB1BB',
    },
});

export { styles };
