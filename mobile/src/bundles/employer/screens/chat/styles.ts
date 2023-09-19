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
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        padding: 10,
        borderRadius: 12,
    },
    messageImage: {
        borderRadius: 12,
        backgroundColor: '#7B77FD',
        width: 60,
        height: 60,
    },
    messageInfo: {
        paddingHorizontal: 10,
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageText: {
        fontWeight: 'bold',
        color: Color.TEXTDARK,
    },
    messageTimeDelivery: {
        fontWeight: 'bold',
        color: '#BCBCBF',
        width: 60,
        textAlign: 'right',
    },
    activeMessage: {
        backgroundColor: '#DDE5FF',
    },
    search: {
        borderRadius: 12,
        backgroundColor: Color.BACKGROUND,
        padding: 15,
    },
});

export { styles };
