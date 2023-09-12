import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    profileWrapper: {
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    profileItems: {
        gap: 16,
        borderTopWidth: 1,
        borderColor: Color.INPUT,
    },
});

export { styles };
