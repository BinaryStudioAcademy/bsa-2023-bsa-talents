import { StyleSheet } from 'react-native';

import { Color } from '../../enums/enums';

const styles = StyleSheet.create({
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#1F1E29',
    },

    dropdownButton: {
        borderWidth: 1,
        borderColor: Color.INPUT,
    },

    overlay: {
        width: '100%',
        height: '100%',
    },

    text: {
        fontSize: 13,
        fontWeight: '400',
    },
    dropdown: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#FFF',
    },
});

export { styles };
