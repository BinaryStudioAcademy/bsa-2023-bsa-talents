import CheckBox from '@react-native-community/checkbox';
import { type StyleProp, type ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FormField, Text, View } from '~/bundles/common/components/components';
import { IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { useMemo, useState } from '../../../common/hooks/hooks';
import { BadgeType } from '../../enums/enums';
import { styles } from './styles';

type BadgeName = (typeof BadgeType)[keyof typeof BadgeType];

type BadgeProperties = {
    style: StyleProp<ViewStyle>;
    ending: string;
    defaultValue: number | string;
};

type Properties = {
    value?: string | number;
    badgeType: BadgeName;
    iconSize?: number;
};

const defaultIconSize = 40;

const Badge: React.FC<Properties> = ({ badgeType, value }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const badges: Record<BadgeName, BadgeProperties> = useMemo(() => {
        return {
            [BadgeType.AVERAGE_LECTURE_SCORE]: {
                style: styles.lectureScore,
                ending: ' / 5',
                defaultValue: 4.2,
            },
            [BadgeType.AVERAGE_PROJECT_SCORE]: {
                style: styles.projectScore,
                ending: ' / 10',
                defaultValue: 8.4,
            },
            [BadgeType.COMMUNICATION_SCORE]: {
                style: styles.communicationScore,
                ending: ' / 10',
                defaultValue: 10,
            },
            [BadgeType.WORKING_WITH_TEAM_SCORE]: {
                style: styles.workingWithTeamScore,
                ending: ' / 10',
                defaultValue: 7,
            },
            [BadgeType.LEVEL_OF_ENGLISH]: {
                style: styles.englishLevel,
                ending: '',
                defaultValue: 'B+',
            },
            [BadgeType.PUNCTUALITY]: {
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
                globalStyles.m5,
                styles.wrapper,
            ]}
        >
            <FormField errors={errors} name="check">
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue): void => {
                        setToggleCheckBox(newValue);
                    }}
                />
            </FormField>

            <View
                style={[
                    globalStyles.p5,
                    globalStyles.borderRadius9,
                    badges[badgeType].style,
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
                    <Text category={TextCategory.H4}>
                        {value ?? badges[badgeType].defaultValue}
                    </Text>
                    <Text category={TextCategory.H4} style={styles.maxScore}>
                        {badges[badgeType].ending}
                    </Text>
                </View>
                <Text category={TextCategory.LABEL}>{badgeType}</Text>
            </View>
        </View>
    );
};

export { Badge };
