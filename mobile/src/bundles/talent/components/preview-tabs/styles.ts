import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    scoreAndSkillsWrapper: {
        borderWidth: 1,
        borderColor: Color.INPUT,
        backgroundColor: '#FFFFFF',
    },
    active: {
        color: Color.PRIMARY,
        borderBottomWidth: 2,
        borderColor: Color.PRIMARY,
    },
});

export { styles };
