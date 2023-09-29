import React from 'react';

import { Tag, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/use-app-selector/use-app-selector.hook';
import { globalStyles } from '~/bundles/common/styles/styles';
import { useLmsData } from '~/bundles/common-data/hooks/use-lms-data/use-lms-data';

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
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const lmsData = useLmsData(currentUserData?.id);

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
            {lmsData?.hrFeedback.comments && (
                <>
                    <Text category={TextCategory.BODY1}>HR Feedback</Text>
                    <View
                        style={[
                            globalStyles.pt5,
                            globalStyles.pb25,
                            globalStyles.flexDirectionRow,
                            styles.personalityWrapper,
                        ]}
                    >
                        <Tag value={lmsData.hrFeedback.comments} />;
                    </View>
                </>
            )}
        </>
    );
};

export { FeedbacksContainer };
