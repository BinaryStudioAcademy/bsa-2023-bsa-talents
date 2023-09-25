import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    messageContainer: {
        gap: 10,
    },
    receiver: {
        backgroundColor: Color.BACKGROUND,
        maxWidth: '85%',
    },
    sender: {
        backgroundColor: Color.TAG,
        maxWidth: '85%',
    },
});

export { styles };
