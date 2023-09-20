import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    userName: {
        fontWeight: 'bold',
    },
    message: {
        fontWeight: 'bold',
        color: Color.TEXTDARK,
    },
    timeDelivery: {
        fontWeight: 'bold',
        color: '#BCBCBF',
        width: 60,
        textAlign: 'right',
    },
});

export { styles };
