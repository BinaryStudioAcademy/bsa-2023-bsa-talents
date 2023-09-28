import React from 'react';

import {
    CommunityIcon,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    BadgeSize,
    IconSize,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { getBadgeColor, getBadgeIcon } from '~/bundles/common/helpers/helpers';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type BadgesItem, type ValueOf } from '~/bundles/common/types/types';

import { styles } from './styles';

type TBadgeSize = ValueOf<typeof BadgeSize>;

type Properties = {
    badge: BadgesItem;
    score?: number | null;
    level?: string | null;
    iconSize?: number;
    size?: TBadgeSize;
};

const Badge: React.FC<Properties> = ({
    badge,
    score,
    level,
    iconSize = IconSize.SMALL,
    size = BadgeSize.LARGE,
}) => {
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
                    { backgroundColor: getBadgeColor(badge.type) },
                    size === BadgeSize.SMALL && globalStyles.alignSelfFlexStart,
                ]}
            >
                <CommunityIcon
                    name={getBadgeIcon(badge.type)}
                    size={iconSize}
                    color="#FFF"
                />
            </View>
            <View style={styles.textWrapper}>
                <View style={globalStyles.flexDirectionRow}>
                    <Text category={valueFontSize}>{score ?? level}</Text>
                    {badge.maxScore && (
                        <Text category={valueFontSize} style={styles.maxScore}>
                            {badge.maxScore}
                        </Text>
                    )}
                </View>
                <Text
                    maxFontSizeMultiplier={1}
                    category={
                        size === BadgeSize.SMALL
                            ? TextCategory.BADGE
                            : TextCategory.LABEL
                    }
                >
                    {badge.name}
                </Text>
            </View>
        </View>
    );
};

export { Badge };
