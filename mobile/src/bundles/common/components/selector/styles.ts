import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

import { SELECTOR_STYLE } from './constants/constants';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    dropdown: {
        position: 'absolute',
        top: '95%',
        maxHeight: SELECTOR_STYLE.MAX_DROPDOWN_HEIGHT,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#FFF',
        zIndex: 1,
    },
});

export { styles };
