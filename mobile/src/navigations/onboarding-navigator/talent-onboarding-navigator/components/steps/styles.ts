import { Color } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    title: {
        margin: 30,
    },
    button: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
    },
    verticalLine: {
        height: 380,
        width: 3,
        backgroundColor: Color.INPUT,
        position: 'absolute',
        top: 140,
        left: 39,
    },
    logout: {
        width: '50%',
        margin: 30,
    },
});

export { styles };
