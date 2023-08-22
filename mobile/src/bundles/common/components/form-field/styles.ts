import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    label: {
        color: '#000',
        fontSize: 15,
    },
    errorText: {
        color: Color.ERROR,
    },
    requiredFlag: {
        color: Color.PRIMARY,
    },
});

export { styles };
