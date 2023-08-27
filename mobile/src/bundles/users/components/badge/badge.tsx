import { type ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text, View } from '~/bundles/common/components/components';
import { IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { useMemo } from '../../../common/hooks/hooks';
import { BadgeType } from '../../enums/enums';
import { styles } from './styles';

type BadgeName = (typeof BadgeType)[keyof typeof BadgeType];

type Properties = {
    value: string;
    description: string;
    badgeType: BadgeName;
    iconSize?: number;
};

const defaultIconSize = 40;

const Badge: React.FC<Properties> = ({ badgeType }) => {
    const componentStyles: Record<BadgeName, ViewStyle> = useMemo(() => {
        return {
            [BadgeType.AVERAGE_LECTURE_SCORE]: styles.lectureScore,
            [BadgeType.AVERAGE_PROJECT_SCORE]: styles.projectScore,
            [BadgeType.COMMUNICATION_SCORE]: styles.communicationScore,
            [BadgeType.WORKING_WITH_TEAM_SCORE]: styles.workingWithTeamScore,
            [BadgeType.LEVEL_OF_ENGLISH]: styles.englishLevel,
            [BadgeType.PUNCTUALITY]: styles.punctuality,
        };
    }, []);

    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsFlexStart,
                globalStyles.borderRadius9,
                globalStyles.p10,
                globalStyles.m5,
                styles.wrapper,
            ]}
        >
            <View
                style={[
                    globalStyles.p5,
                    globalStyles.borderRadius9,
                    componentStyles[badgeType],
                ]}
            >
                <Icon
                    name={IconName.HEADPHONES}
                    size={defaultIconSize}
                    color="#FFF"
                />
            </View>
            <View style={styles.textWrapper}>
                <View style={globalStyles.flexDirectionRow}>
                    <Text category={TextCategory.H4}>4.2 </Text>
                    <Text category={TextCategory.H4} style={styles.maxScore}>
                        / 5
                    </Text>
                </View>
                <Text category={TextCategory.LABEL}>
                    Your average project score
                </Text>
            </View>
        </View>
    );
};

export { Badge };
