import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    singleStep: { gap: 10 },
    step: {
        color: Color.PRIMARY,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    activeIcon: {
        backgroundColor: '#fff',
    },
    screenName: {
        color: Color.TEXT2,
    },
    activeScreenName: {
        fontWeight: 'bold',
        color: Color.TEXT,
    },
});

export { styles };
