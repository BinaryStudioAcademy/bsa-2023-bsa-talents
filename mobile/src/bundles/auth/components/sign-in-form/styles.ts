import { StyleSheet } from 'react-native';

import { Color, FontFamily } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        gap: 10,
    },
    title: {
        fontFamily: FontFamily.INTER_BOLD,
    },
    linkForgotPassword: {
        color: Color.PRIMARY,
    },
    text: {
        color: Color.TEXT2,
    },
    linkSignUp: {
        color: Color.PRIMARY,
        fontFamily: FontFamily.INTER_SEMIBOLD,
    },
    linkContainer: {
        flexWrap: 'wrap',
        flexShrink: 1,
        gap: 5,
    },
    formWrapper: {
        gap: 25,
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 48,
    },
});

export { styles };
