import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    defaultAvatar: {
        borderRadius: 15,
        backgroundColor: '#7B77FD',
        width: 60,
        height: 60,
    },
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
    selectedItem: {
        borderRadius: 15,
        backgroundColor: '#DDE5FF',
    },
});

export { styles };
