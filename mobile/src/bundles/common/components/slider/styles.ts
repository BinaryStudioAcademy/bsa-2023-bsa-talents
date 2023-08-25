import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    slider: {
        borderRadius: 6,
    },
    label: {
        fontWeight: '500',
    },
    label_icon: {
        fontWeight: '500',
        color: Color.PRIMARY,
    },
});

export { styles };
