import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.BACKGROUND,
        borderBottomWidth: 1,
        borderColor: Color.INPUT,
    },
    container: {
        backgroundColor: '#FFFFFF',
    },
});

export { styles };
