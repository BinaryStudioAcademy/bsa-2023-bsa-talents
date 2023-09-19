import { Color } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    scoreAndSkillsWrapper: {
        borderWidth: 1,
        borderColor: Color.INPUT,
        backgroundColor: '#FFFFFF',
        minHeight: 300,
    },
    active: {
        color: Color.PRIMARY,
        borderBottomWidth: 2,
        borderColor: Color.PRIMARY,
    },
});

export { styles };
