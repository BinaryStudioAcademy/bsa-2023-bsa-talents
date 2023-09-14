import { StyleSheet } from 'react-native';

import { Color, FontFamily } from '~/bundles/common/enums/enums';

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
        textTransform: 'capitalize',
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
        gap: 15,
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
