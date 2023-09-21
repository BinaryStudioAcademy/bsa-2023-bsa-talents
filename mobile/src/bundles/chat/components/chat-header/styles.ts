import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
    },
    status: {
        fontWeight: 'bold',
        color: Color.TEXTDARK,
    },
    indicator: {
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: '#67D391',
    },
    headerContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: Color.INPUT,
    },
});

export { styles };
