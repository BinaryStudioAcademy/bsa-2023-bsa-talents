import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    messageContainer: {
        gap: 10,
    },
    receiver: {
        backgroundColor: Color.BACKGROUND,
        maxWidth: '85%',
        color: Color.TEXT,
    },
    sender: {
        backgroundColor: Color.TAG,
        maxWidth: '85%',
        color: Color.TEXT,
    },
});

export { styles };
