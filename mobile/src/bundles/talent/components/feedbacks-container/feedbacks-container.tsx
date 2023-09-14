import React from 'react';

import { Tag, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

//todo replace with real data
const mockUser = {
    PERSONAL_TYPE: ['Thinker'],
    HR_BADGES: [
        'Communicative',
        'Collaboration',
        'Creative',
        'Problem-solving',
        'Leadership',
    ],
};

const FeedbacksContainer = (): JSX.Element => {
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
                {mockUser.PERSONAL_TYPE.map((type) => {
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
                {mockUser.HR_BADGES.map((badge) => {
                    return <Tag key={badge} value={badge} />;
                })}
            </View>
        </>
    );
};

export { FeedbacksContainer };
