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
    const { profileStepData } = useAppSelector(({ talents }) => ({
        profileStepData: talents.profileFormData,
    }));

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleProfileSubmit = useCallback(
        (payload: ProfileStepDto): void => {
            void dispatch(talentActions.setProfileStep(payload));
        },
        [dispatch],
    );

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <ProfileForm
                data={profileStepData}
                onSubmit={handleProfileSubmit}
            />
        </View>
    );
};

export { Profile };
