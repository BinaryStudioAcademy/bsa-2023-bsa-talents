import { StyleSheet } from '~/bundles/common/components/components';
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
    active: {
        color: Color.PRIMARY,
        borderBottomWidth: 2,
        borderColor: Color.PRIMARY,
    },
});

export { styles };
