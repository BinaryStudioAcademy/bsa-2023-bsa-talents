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
    formWrapper: {
        gap: 25,
    },
});

export { styles };
