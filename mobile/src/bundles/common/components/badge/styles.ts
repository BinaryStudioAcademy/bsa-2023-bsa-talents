import { Color } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    wrapper: {
        flexShrink: 1,
        gap: 10,
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    maxScore: {
        color: Color.TEXT2,
    },
    textWrapper: {
        flexShrink: 1,
    },
    iconBackgroundColor: {
        backgroundColor: '#FFD231',
    },

    small: {
        width: '48%',
    },
});

export { styles };
