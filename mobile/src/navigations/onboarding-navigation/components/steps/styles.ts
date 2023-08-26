import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    title: {
        margin: 30,
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
