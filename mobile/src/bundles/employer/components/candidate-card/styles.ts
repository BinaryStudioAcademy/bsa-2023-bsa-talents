import { Color, FontFamily } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Color.INPUT,
        backgroundColor: '#fff',
    },
    header: {
        borderBottomWidth: 1,
        borderColor: Color.INPUT,
    },
    title: {
        fontFamily: FontFamily.INTER_BOLD,
    },
    supportingText: {
        color: Color.TEXT2,
    },
    salary: {
        fontFamily: FontFamily.INTER_BOLD,
    },
    badgeContainer: {
        gap: 10,
    },
    skills: {
        gap: 10,
        flexWrap: 'wrap',
    },
    skillsLabel: {
        fontFamily: FontFamily.INTER_BOLD,
    },
    divider: {
        height: 1,
        backgroundColor: Color.INPUT,
    },
});

export { styles };
