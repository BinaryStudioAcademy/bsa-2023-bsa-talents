import { Color } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    container: {
        gap: 5,
        borderBottomWidth: 1,
        borderColor: Color.INPUT,
    },
    talentsNumber: {
        backgroundColor: Color.PRIMARY,
        color: '#fff',
        paddingVertical: 2,
    },
});

export { styles };
