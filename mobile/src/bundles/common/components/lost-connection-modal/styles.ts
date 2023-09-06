import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        backgroundColor: '#000000',
        opacity: 0.8,
        zIndex: 9999,
    },
    container: {
        backgroundColor: Color.ERROR,
    },
    message: {
        color: '#ffffff',
    },
});

export { styles };
