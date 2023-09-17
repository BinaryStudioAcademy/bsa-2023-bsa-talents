import { StyleSheet } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';

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
