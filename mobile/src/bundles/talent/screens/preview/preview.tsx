import React from 'react';
import { type ValueOf } from 'shared/build/index';

import {
    Button,
    ScrollView,
    View,
} from '~/bundles/common/components/components';
import { type TalentOnboardingScreenName } from '~/bundles/common/enums/enums';
import {
    ButtonType,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import { useAppRoute } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { NewAccountHeader } from '../../components/components';
import { ProfilePreview } from '../../components/profile-preview/profile-preview';
import { styles } from './style';

const Preview: React.FC = () => {
    const { name } = useAppRoute();
    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    return (
        <View style={[globalStyles.flex1, globalStyles.mb25]}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <ScrollView
                style={[
                    globalStyles.defaultScreenPadding,
                    styles.screenWrapper,
                ]}
            >
                <ProfilePreview />

                <View>
                    <Button
                        label="Save without publishing"
                        buttonType={ButtonType.OUTLINE}
                        style={globalStyles.mb10}
                    />
                    <Button label="Publish now" style={globalStyles.mb25} />
                </View>
            </ScrollView>
        </View>
    );
};

export { Preview };
