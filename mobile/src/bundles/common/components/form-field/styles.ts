import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    errorText: {
        color: Color.ERROR,
    },
    requiredFlag: {
        color: Color.PRIMARY,
    },
});

export { styles };
