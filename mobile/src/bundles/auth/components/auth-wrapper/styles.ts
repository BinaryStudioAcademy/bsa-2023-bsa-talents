import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.TEXT,
        gap: 50,
    },
    img: {
        width: 270,
        height: 52,
        marginTop: 50,
    },
});

export { styles };
