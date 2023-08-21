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
        borderColor: 'transparent',
    },
    label: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    label_secondary: {
        color: '#274F8D',
    },
    label_secondary_pressed: {
        color: '#2E61AE',
    },
    button_primary: {
        backgroundColor: '#274F8D',
    },
    button_secondary: {
        backgroundColor: '#FFFFFF',
        borderColor: '#274F8D',
    },
    button_primary_pressed: {
        backgroundColor: '#2E61AE',
    },
    button_secondary_pressed: {
        borderColor: '#2E61AE',
    },
    button_primary_disabled: {
        backgroundColor: '#F7F8FC',
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
    },
    icon: {
        color: '#274F8D',
    },
    icon_pressed: {
        color: '#2E61AE',
    },
    content_disabled: {
        color: '#AAB1BB',
    },
});

export { styles };
