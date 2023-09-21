import { Color } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    text: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: Color.PRIMARY,
        backgroundColor: Color.TAG,
        color: Color.TEXT,
    },
});

export { styles };
