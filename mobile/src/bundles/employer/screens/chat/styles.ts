import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.BACKGROUND,
        borderBottomWidth: 1,
        borderColor: Color.INPUT,
    },
    chatContainer: {
        backgroundColor: '#FFFFFF',
    },
    chatList: {
        flexGrow: 1,
    },
    search: {
        borderRadius: 15,
        backgroundColor: Color.BACKGROUND,
        padding: 15,
    },
});

export { styles };
