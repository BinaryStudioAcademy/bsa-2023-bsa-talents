import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    dropdownButton: {
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    dropdown: {
        position: 'absolute',
        top: '95%',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#FFF',
        zIndex: 1,
    },
});

export { styles };
