import { Color } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    img: {
        resizeMode: 'cover',
    },
    icon: {
        color: '#FFFFFF',
        backgroundColor: Color.PRIMARY,
    },
    initials: {
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
        borderRadius: 50,
    },
});

export { styles };
