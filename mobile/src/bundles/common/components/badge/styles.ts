import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    wrapper: {
        flexShrink: 1,
        gap: 10,
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    small: {
        width: 150,
    },
    maxScore: {
        color: Color.TEXT2,
    },
    textWrapper: {
        flexShrink: 1,
    },
    lectureScore: {
        backgroundColor: '#18A0FB',
    },
    projectScore: {
        backgroundColor: '#EE2A64',
    },
    communicationScore: {
        backgroundColor: '#FFD230',
    },
    workingWithTeamScore: {
        backgroundColor: '#D32AEE',
    },
    englishLevel: {
        backgroundColor: '#20BB67',
    },
    punctuality: {
        backgroundColor: '#FF951A',
    },
});

export { styles };