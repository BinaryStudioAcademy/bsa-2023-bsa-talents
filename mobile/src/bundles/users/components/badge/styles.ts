import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    backgroundIcon: {
        backgroundColor: 'red',
    },
    wrapper: {
        flexShrink: 1,
        gap: 10,
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    maxScore: {
        color: Color.TEXT2,
    },
    textWrapper: {
        flexShrink: 1,
    },
});

export { styles };
