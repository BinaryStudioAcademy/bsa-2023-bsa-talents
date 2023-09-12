import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    input: {
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    error: {
        borderColor: Color.ERROR,
    },
    dropdown: {
        position: 'absolute',
        top: '95%',
        maxHeight: 150,
        borderWidth: 1,
        borderColor: Color.INPUT,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#FFF',
        zIndex: 1,
    },
    tagContainer: {
        gap: 5,
        flexWrap: 'wrap',
    },
    dropdownButton: {
        position: 'absolute',
        bottom: 0,
        right: 5,
        zIndex: 1,
    },
});

export { styles };
