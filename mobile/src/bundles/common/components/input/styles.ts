import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#7e7e7e',
        fontSize: 15,
    },
    label: {
        color: '#000',
        fontSize: 15,
    },
    error: {
        borderColor: Color.ERROR,
    },
    errorText: {
        color: Color.ERROR,
    },
    disabled: {
        backgroundColor: Color.INPUT,
        opacity: 0.5,
    },
    disabledLabel: {
        opacity: 0.4,
    },
});

export { styles };
