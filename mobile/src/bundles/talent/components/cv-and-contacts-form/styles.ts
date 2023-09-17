import { StyleSheet } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexGrow: 1,
    },
    captionContainer: {
        backgroundColor: Color.TAG,
    },
    buttonContainer: {
        borderColor: Color.INPUT,
    },
});

export { styles };
