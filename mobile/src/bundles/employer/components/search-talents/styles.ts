import { StyleSheet } from 'react-native';

import { Color, FontFamily } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    search: {
        width: '75%',
    },
    filtersBtn: {
        backgroundColor: '#fff',
    },
    filtersText: {
        color: Color.PRIMARY,
        fontFamily: FontFamily.INTER_SEMIBOLD,
    },
    input: {
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
});

export { styles };
