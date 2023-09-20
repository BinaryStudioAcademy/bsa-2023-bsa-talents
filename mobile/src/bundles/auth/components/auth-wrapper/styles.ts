import { Color } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Color.TEXT,
        gap: 50,
    },
    img: {
        width: 270,
        height: 52,
        marginTop: 50,
    },
});

export { styles };
