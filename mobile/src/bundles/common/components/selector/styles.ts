import { StyleSheet } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    dropdownButton: {
        borderColor: Color.INPUT,
        borderWidth: 1,
    },
    dropdown: {
        position: 'absolute',
        top: '95%',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderWidth: 1,
        borderColor: Color.INPUT,
        backgroundColor: '#FFF',
        zIndex: 1,
    },
    placeholder: {
        color: Color.TEXT2,
    },
    error: {
        borderColor: Color.ERROR,
    },
});

export { styles };
