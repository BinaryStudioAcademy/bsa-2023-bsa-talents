import { type StyleProp, type ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text, View } from '~/bundles/common/components/components';
import {
    BadgeSize,
    IconName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useMemo } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';
import { type ValueOf } from '~/bundles/common/types/types';
import { BsaBadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';

import { styles } from './styles';

type BadgeName = ValueOf<typeof BsaBadgeStepBadgesTitle>;
type TBadgeSize = ValueOf<typeof BadgeSize>;

type BadgeProperties = {
    style: StyleProp<ViewStyle>;
    ending: string;
    defaultValue: number | string;
};

type Properties = {
    value?: string | number;
    badgeType: BadgeName;
    iconSize?: number;
    size?: TBadgeSize;
};

const defaultIconSize = 40;

const Badge: React.FC<Properties> = ({
    badgeType,
    value,
    iconSize = defaultIconSize,
    size = BadgeSize.LARGE,
}) => {
    // TODO: replace with real data
    const badges: Record<BadgeName, BadgeProperties> = useMemo(() => {
        return {
            [BsaBadgeStepBadgesTitle.LECTURE_SCORE]: {
                style: styles.lectureScore,
                ending: ' / 5',
                defaultValue: 4.2,
            },
            [BsaBadgeStepBadgesTitle.PROJECT_SCORE]: {
                style: styles.projectScore,
                ending: ' / 10',
                defaultValue: 8.4,
            },
            [BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE]: {
                style: styles.communicationScore,
                ending: ' / 10',
                defaultValue: 10,
            },
            [BsaBadgeStepBadgesTitle.TEAM_SCORE]: {
                style: styles.workingWithTeamScore,
                ending: ' / 10',
                defaultValue: 7,
            },
            [BsaBadgeStepBadgesTitle.ENGLISH_LEVEL]: {
                style: styles.englishLevel,
                ending: '',
                defaultValue: 'B+',
            },
            [BsaBadgeStepBadgesTitle.PUNCTUALITY]: {
                style: styles.punctuality,
                ending: ' / 10',
                defaultValue: 7,
            },
        };
    }, []);

    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                globalStyles.borderRadius9,
                globalStyles.p10,
                styles.wrapper,
                size === BadgeSize.SMALL ? styles.small : globalStyles.flex1,
            ]}
        >
            <View
                style={[
                    globalStyles.p5,
                    globalStyles.borderRadius9,
                    badges[badgeType].style,
                    size === BadgeSize.SMALL && globalStyles.alignSelfFlexStart,
                ]}
            >
                <Icon name={IconName.HEADPHONES} size={iconSize} color="#FFF" />
            </View>
            <View style={styles.textWrapper}>
                <View style={globalStyles.flexDirectionRow}>
                    <Text
                        category={
                            size === BadgeSize.SMALL
                                ? TextCategory.H5
                                : TextCategory.H4
                        }
                    >
                        {value ?? badges[badgeType].defaultValue}
                    </Text>
                    <Text
                        category={
                            size === BadgeSize.SMALL
                                ? TextCategory.H5
                                : TextCategory.H4
                        }
                        style={styles.maxScore}
                    >
                        {badges[badgeType].ending}
                    </Text>
                </View>
                <Text
                    category={
                        size === BadgeSize.SMALL
                            ? TextCategory.BADGE
                            : TextCategory.LABEL
                    }
                >
                    {badgeType}
                </Text>
            </View>
        </View>
    );
};

export { Badge };
