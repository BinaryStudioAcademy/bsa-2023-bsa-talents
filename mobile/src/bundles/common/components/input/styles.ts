import { Color } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    marker: {
        backgroundColor: Color.INPUT,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: Color.INPUT,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    multiline: {
        textAlignVertical: 'top',
    },
    error: {
        borderColor: Color.ERROR,
    },
    isDisabled: {
        backgroundColor: Color.INPUT,
        opacity: 0.5,
    },
    iconContainer: {
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: Color.INPUT,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    noLeftBorder: {
        borderLeftWidth: 0,
    },
});

export { styles };
