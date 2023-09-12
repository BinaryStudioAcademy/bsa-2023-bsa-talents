import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    profileWrapper: {
        borderWidth: 1,
        borderColor: Color.INPUT,
    },
    profileItems: {
        borderTopWidth: 1,
        borderColor: Color.INPUT,
    },
    scoreAndSkillsWrapper: {
        borderWidth: 1,
        borderColor: Color.INPUT,
        backgroundColor: '#FFFFFF',
    },
});

export { styles };
