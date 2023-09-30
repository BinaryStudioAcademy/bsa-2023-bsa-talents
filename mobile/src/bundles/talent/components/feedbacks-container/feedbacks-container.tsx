import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/use-app-selector/use-app-selector.hook';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

const FeedbacksContainer = (): JSX.Element => {
    const { lmsData } = useAppSelector(({ commonData }) => commonData);

    return (
        <>
            <Text category={TextCategory.BODY1}>HR Feedback: </Text>
            <View
                style={[
                    globalStyles.pt5,
                    globalStyles.pb25,
                    globalStyles.flexDirectionRow,
                    styles.personalityWrapper,
                ]}
            >
                <Text>
                    {lmsData?.hrFeedback.result.comment ??
                        lmsData?.hrFeedback.comments}
                </Text>
            </View>
        </>
    );
};

export { FeedbacksContainer };
