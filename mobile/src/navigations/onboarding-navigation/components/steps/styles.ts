import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    con: {
        flex: 1,
        color: Color.BACKGROUND,
    },
    button: {
        backgroundColor: '#000',
        width: 30,
        position: 'absolute',
        right: 0,
    },
    verticalLine: {
        height: 380,
        width: 3,
        backgroundColor: Color.INPUT,
        position: 'absolute',
        top: 140,
        left: 39,
    },
});

export { styles };
