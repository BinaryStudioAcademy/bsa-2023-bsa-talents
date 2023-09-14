import { StyleSheet } from 'react-native';

import { Color, FontFamily } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    search: {
        width: '75%',
    },
    input: {
        borderWidth: 1,
        borderLeftWidth: 0,
        borderColor: Color.INPUT,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    iconContainer: {
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: Color.INPUT,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingVertical: 12,
    },
    filtersBtn: {
        backgroundColor: '#fff',
    },
    filtersText: {
        color: Color.PRIMARY,
        fontFamily: FontFamily.INTER_SEMIBOLD,
    },
});

export { styles };
