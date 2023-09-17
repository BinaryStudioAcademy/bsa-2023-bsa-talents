import { StyleSheet } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFFFFF',
    },
    progressBarContainer: {
        height: 3,
    },
    progressBarFill: {
        backgroundColor: Color.PRIMARY,
    },
    progressBarBackground: {
        backgroundColor: Color.TAG,
    },
    letterSpacingText: {
        letterSpacing: 1.5,
    },
});

export { styles };
