import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    textEntryField: {
        maxHeight: 100,
    },
    sendIcon: {
        transform: [{ rotate: '-45deg' }],
    },
});

export { styles };
