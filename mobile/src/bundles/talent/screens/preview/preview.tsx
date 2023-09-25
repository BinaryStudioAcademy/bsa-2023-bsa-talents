import React from 'react';

import {
    Button,
    ScrollView,
    View,
} from '~/bundles/common/components/components';
import {
    ButtonType,
    CompletedTalentOnboardingStep,
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';
import { actions as commonActions } from '~/bundles/common/store';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    NewAccountHeader,
    ProfilePreview,
} from '~/bundles/talent/components/components';

import { styles } from './style';

const Preview: React.FC = () => {
    const { name } = useAppRoute();
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const userId = currentUserData?.id ?? '';

    const dispatch = useAppDispatch();
    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];
    const completedOnboardingStep = CompletedTalentOnboardingStep[stepTitle];

    const handlePreviewSubmit = useCallback((): void => {
        void dispatch(
            commonActions.updateOnboardingData({
                userId: userId,
                completedStep: completedOnboardingStep,
            }),
        );
    }, [dispatch, userId, completedOnboardingStep]);

    //TODO add logic for "Publish now"

    return (
        <View style={[globalStyles.flex1, globalStyles.mb25]}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <ScrollView
                style={[
                    globalStyles.defaultScreenPadding,
                    styles.screenWrapper,
                ]}
                showsVerticalScrollIndicator={false}
            >
                <ProfilePreview />
                {/* todo: add logic */}
                <View>
                    <Button
                        label="Save without publishing"
                        buttonType={ButtonType.OUTLINE}
                        style={globalStyles.mb10}
                        onPress={handlePreviewSubmit}
                    />
                    <Button label="Publish now" style={globalStyles.mb25} />
                </View>
            </ScrollView>
        </View>
    );
};

export { Preview };
