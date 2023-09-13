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
    CVAndContactsForm,
    NewAccountHeader,
} from '~/bundles/talent/components/components';
import { getNextStepTitle } from '~/bundles/talent/helpers/helpers';
import { actions as talentActions } from '~/bundles/talent/store';
import { type CvAndContactsFormDto } from '~/bundles/talent/types/types';

const CVAndContacts: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();
    const { onboardingData } = useAppSelector(({ talents }) => talents);

    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const userId = currentUserData?.id ?? '';

    const cvAndContactsStepData: CvAndContactsFormDto | null = onboardingData
        ? {
              photo: onboardingData.photo ?? null,
              fullName: onboardingData.fullName,
              phone: onboardingData.phone ?? '',
              linkedinLink: onboardingData.linkedinLink ?? '',
              cv: onboardingData.cv ?? null,
          }
        : null;

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handleSubmit = useCallback(
        async (payload: CvAndContactsFormDto): Promise<void> => {
            const updatedCVAndContactsPayload = {
                ...payload,
                userId,
            };
            const result = await dispatch(
                talentActions.updateOnboardingData(updatedCVAndContactsPayload),
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
        [dispatch, navigate, userId, stepNumber, stepTitle],
    );

    const handleCVAndContactsSubmit = (payload: CvAndContactsFormDto): void => {
        void handleSubmit(payload);
    };

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <CVAndContactsForm
                cvAndContactsStepData={cvAndContactsStepData}
                onSubmit={handleCVAndContactsSubmit}
                currentStep={stepNumber}
            />
        </View>
    );
};

export { CVAndContacts };
