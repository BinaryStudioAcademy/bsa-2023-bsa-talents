import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import { View } from '~/bundles/common/components/components';
import {
    TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
    TalentOnboardingStepState,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type TalentOnboardingNavigationParameterList,
    type ValueOf,
} from '~/bundles/common/types/types';
import {
    NewAccountHeader,
    ProfileForm,
} from '~/bundles/talent/components/components';
import { actions as talentActions } from '~/bundles/talent/store';
import { type ProfileStepDto } from '~/bundles/talent/types/types';

const Profile: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();
    const { profileStepData, completedStep } = useAppSelector(
        ({ talents }) => talents,
    );
    const { currentUser } = useAppSelector(({ auth }) => auth);

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handleSubmit = useCallback(
        async (payload: ProfileStepDto): Promise<void> => {
            const userId = currentUser?.id ?? '';
            const fullName = payload.profileName;
            const updatedCreateTalentPayload = {
                ...payload,
                userId,
                //TODO delete when it fixes in DB
                fullName,
            };
            const updatedOnboardingDataPayload = {
                ...payload,
                userId,
            };

            const result = completedStep
                ? await dispatch(
                      talentActions.updateOnboardingData(
                          updatedOnboardingDataPayload,
                      ),
                  )
                : await dispatch(
                      talentActions.createTalentDetails(
                          updatedCreateTalentPayload,
                      ),
                  );

            if (result.payload) {
                const setStepResult = dispatch(
                    talentActions.setCompletedStep(stepNumber),
                );
                if (setStepResult.payload) {
                    navigate(TalentOnboardingScreenName.BSA_BADGES, {
                        stepState: TalentOnboardingStepState.FOCUSED,
                    });
                }
            }
        },
        [dispatch, currentUser?.id, completedStep, stepNumber, navigate],
    );

    const handleProfileSubmit = (payload: ProfileStepDto): void => {
        void handleSubmit(payload);
    };

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <ProfileForm
                profileStepData={profileStepData}
                onSubmit={handleProfileSubmit}
            />
        </View>
    );
};

export { Profile };
