import { StyleSheet } from 'react-native';

import { AlignmentValue } from '~/bundles/common/enums/styles/alignment-value.enum';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: AlignmentValue.CENTER,
        alignItems: AlignmentValue.CENTER,
    },
});

export { styles };
