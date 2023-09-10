import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    container: {
        gap: 5,
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    talentsNumber: {
        backgroundColor: Color.PRIMARY,
        color: '#fff',
    },
});

export { styles };
