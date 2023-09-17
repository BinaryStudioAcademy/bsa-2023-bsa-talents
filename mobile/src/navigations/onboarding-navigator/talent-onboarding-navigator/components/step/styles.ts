import { StyleSheet } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    singleStep: {
        gap: 10,
    },
    textCon: {
        position: 'relative',
        top: 13,
    },
    activeIcon: {
        backgroundColor: '#fff',
    },
    step: {
        letterSpacing: 2,
    },
    screenName: {
        color: Color.TEXT2,
    },
    activeScreenName: {
        color: Color.TEXT,
    },
});

export { styles };
