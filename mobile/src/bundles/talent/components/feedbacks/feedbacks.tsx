import React from 'react';

import { Tag, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './styles';

type Properties = {
    personalityType: string[];
    HRBadges: string[];
};

const Feedbacks = ({ personalityType, HRBadges }: Properties): JSX.Element => {
    return (
        <>
            <Text category={TextCategory.BODY1}>Personality type</Text>
            <View
                style={[
                    globalStyles.pt5,
                    globalStyles.pb25,
                    globalStyles.flexDirectionRow,
                    styles.personalityWrapper,
                ]}
            >
                {personalityType.map((type) => {
                    return <Tag key={type} value={type} />;
                })}
            </View>
            <Text category={TextCategory.BODY1}>HR badges</Text>
            <View
                style={[
                    globalStyles.pt5,
                    globalStyles.pb25,
                    globalStyles.flexDirectionRow,
                    styles.personalityWrapper,
                ]}
            >
                {HRBadges.map((badge) => {
                    return <Tag key={badge} value={badge} />;
                })}
            </View>
        </>
    );
};

export { Feedbacks };
