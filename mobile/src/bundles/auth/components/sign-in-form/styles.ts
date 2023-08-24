import { StyleSheet } from 'react-native';

import { Color, FontFamily } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
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
});

export { styles };
