import { StyleSheet } from 'react-native';

import { Color } from '../../enums/enums';

const styles = StyleSheet.create({
    dropdownButton: {
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    dropdown: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#FFF',
        zIndex: 1,
    },
});

export { styles };
