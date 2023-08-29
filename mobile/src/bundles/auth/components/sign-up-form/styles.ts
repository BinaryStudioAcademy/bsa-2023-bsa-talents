import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    wrapper: {
        gap: 25,
        backgroundColor: '#FFFFFF',
    },
    text: {
        color: Color.TEXT2,
    },
    linkToSignIn: {
        color: Color.PRIMARY,
    },
});

export { styles };
