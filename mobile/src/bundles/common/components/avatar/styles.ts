import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    img: {
        resizeMode: 'cover',
    },
    initials: {
        backgroundColor: Color.PRIMARY,
        color: '#FFFFFF',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    small: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    medium: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    large: {
        width: 100,
        height: 100,
        borderRadius: 60,
    },
});

export { styles };
