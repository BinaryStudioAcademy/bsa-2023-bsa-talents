import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    currency: {
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
    error: {
        borderColor: Color.ERROR,
    },
    disabled: {
        backgroundColor: Color.INPUT,
        opacity: 0.5,
    },
});

export { styles };
