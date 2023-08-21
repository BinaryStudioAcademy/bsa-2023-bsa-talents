import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#7e7e7e',
        borderRadius: 5,
        fontSize: 15,
        paddingLeft: 10,
    },
    label: {
        color: '#000',
        fontSize: 15,
        marginVertical: 5,
    },
    error: {
        borderWidth: 1,
        borderColor: '#ff3d3d',
        borderRadius: 5,
        fontSize: 15,
        paddingLeft: 10,
    },
    errorText: {
        color: '#ff3d3d',
    },
    disabled: {
        borderWidth: 1,
        borderColor: '#a6abb4',
        backgroundColor: '#d5dce8',
        opacity: 0.5,
        borderRadius: 5,
        fontSize: 15,
        paddingLeft: 10,
    },
    disabledLabel: {
        color: '#000',
        fontSize: 15,
        marginVertical: 5,
        opacity: 0.4,
    },
});

export { styles };
