import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    marker: {
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
    multiline: {
        textAlignVertical: 'top',
    },
    error: {
        borderColor: Color.ERROR,
    },
    disabled: {
        backgroundColor: Color.INPUT,
        opacity: 0.5,
    },
    icon: {
        position: 'absolute',
        left: 0,
        top: 12,
    },
});

export { styles };
