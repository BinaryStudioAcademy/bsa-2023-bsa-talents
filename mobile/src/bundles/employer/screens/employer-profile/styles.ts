import { Color } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.BACKGROUND,
        borderBottomWidth: 1,
        borderColor: Color.INPUT,
    },
    container: {
        backgroundColor: '#FFFFFF',
    },
});

export { styles };
