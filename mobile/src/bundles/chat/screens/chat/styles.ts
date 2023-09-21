import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    chatContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: Color.INPUT,
    },
    chatList: {
        flexGrow: 1,
    },
});

export { styles };
