import React from 'react';

import { View } from '~/bundles/common/components/components';
import {
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    NewAccountHeader,
    ProfileForm,
} from '~/bundles/talent/components/components';
import { actions as talentActions } from '~/bundles/talent/store';
import { type ProfileStepDto } from '~/bundles/talent/types/types';

const Profile: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();
    const { profileStepData1 } = useAppSelector(({ talents }) => talents);
    const { currentUser } = useAppSelector(({ auth }) => auth);

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleProfileSubmit = useCallback(
        (payload: ProfileStepDto): void => {
            const userId = currentUser?.id;

            const updatedPayload = {
                ...payload,
                userId,
            };

            void dispatch(talentActions.completeProfileStep(updatedPayload));
        },
        [dispatch, currentUser?.id],
    );

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <ProfileForm
                profileStepData={profileStepData1}
                onSubmit={handleProfileSubmit}
            />
        </View>
    );
};

export { Profile };
