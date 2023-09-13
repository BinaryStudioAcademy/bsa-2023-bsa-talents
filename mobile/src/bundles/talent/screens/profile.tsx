import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import { View } from '~/bundles/common/components/components';
import {
    type TalentOnboardingScreenName,
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
import { getNextStepTitle } from '~/bundles/talent/helpers/helpers';
import { actions as talentActions } from '~/bundles/talent/store';
import { type ProfileStepDto } from '~/bundles/talent/types/types';

const Profile: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();
    const { completedStep, onboardingData } = useAppSelector(
        ({ talents }) => talents,
    );
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const userId = currentUserData?.id ?? '';

    const {
        profileName,
        salaryExpectation,
        jobTitle,
        location,
        experienceYears,
        employmentType,
        description,
    } = onboardingData ?? {};
    const profileStepData: ProfileStepDto | null = onboardingData
        ? ({
              profileName,
              salaryExpectation,
              jobTitle,
              location,
              experienceYears,
              employmentType,
              description,
          } as ProfileStepDto)
        : null;

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handleSubmit = useCallback(
        async (payload: ProfileStepDto): Promise<void> => {
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
                    talentActions.setCompletedStep(stepTitle),
                );
                const nextStepTitle = getNextStepTitle(stepNumber);
                if (setStepResult.payload && nextStepTitle) {
                    navigate(nextStepTitle, {
                        stepState: TalentOnboardingStepState.FOCUSED,
                    });
                }
            }
        },
        [dispatch, navigate, userId, completedStep, stepNumber, stepTitle],
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
