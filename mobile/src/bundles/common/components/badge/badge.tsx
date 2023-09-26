import React from 'react';

import {
    MaterialIcon,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    BadgeSize,
    BsaBadgeStepBadgesTitle,
    IconName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useMemo } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';

import { styles } from './styles';

type BadgeName = ValueOf<typeof BsaBadgeStepBadgesTitle>;
type TBadgeSize = ValueOf<typeof BadgeSize>;

type BadgeProperties = {
    ending: string;
    defaultValue: number | string;
};

type Properties = {
    value?: string | number;
    badgeType: BadgeName;
    iconSize?: number;
    size?: TBadgeSize;
};

const DEFAULT_ICON_SIZE = 40;

const Badge: React.FC<Properties> = ({
    badgeType,
    value,
    iconSize = DEFAULT_ICON_SIZE,
    size = BadgeSize.LARGE,
}) => {
    // TODO: replace with real data
    const badges: Record<BadgeName, BadgeProperties> = useMemo(() => {
        return {
            [BsaBadgeStepBadgesTitle.LECTURE_SCORE]: {
                ending: ' / 10',
                defaultValue: 8,
            },
            [BsaBadgeStepBadgesTitle.PROJECT_SCORE]: {
                ending: ' / 5',
                defaultValue: 4,
            },
            [BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE]: {
                ending: ' / 5',
                defaultValue: 4,
            },
            [BsaBadgeStepBadgesTitle.TEAM_SCORE]: {
                ending: ' / 5',
                defaultValue: 4,
            },
            [BsaBadgeStepBadgesTitle.ENGLISH_LEVEL]: {
                ending: '',
                defaultValue: 'B+',
            },
        };
    }, []);

    const valueFontSize =
        size === BadgeSize.SMALL ? TextCategory.H5 : TextCategory.H4;

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
                    styles.iconBackgroundColor,
                    size === BadgeSize.SMALL && globalStyles.alignSelfFlexStart,
                ]}
            >
                <MaterialIcon
                    name={IconName.HEADPHONES}
                    size={iconSize}
                    color="#FFF"
                />
            </View>
            <View style={styles.textWrapper}>
                <View style={globalStyles.flexDirectionRow}>
                    <Text category={valueFontSize}>
                        {value ?? badges[badgeType].defaultValue}
                    </Text>
                    <Text category={valueFontSize} style={styles.maxScore}>
                        {badges[badgeType].ending}
                    </Text>
                </View>
                <Text
                    maxFontSizeMultiplier={1}
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
