import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
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
    requiredFlag: {
        color: Color.PRIMARY,
    },
});

export { styles };
