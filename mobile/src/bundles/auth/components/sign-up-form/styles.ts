import { Color, FontFamily } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    container: {
        gap: 5,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontFamily: FontFamily.INTER_BOLD,
    },
    text: {
        color: Color.TEXT2,
    },
    linkToSignIn: {
        color: Color.PRIMARY,
        fontFamily: FontFamily.INTER_SEMIBOLD,
    },
    formWrapper: {
        gap: 25,
    },
});

export { styles };
