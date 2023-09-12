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
import { globalStyles } from '~/bundles/common/styles/global-styles';
import {
    type TalentOnboardingNavigationParameterList,
    type ValueOf,
} from '~/bundles/common/types/types';
import {
    BsaBadgesForm,
    NewAccountHeader,
} from '~/bundles/talent/components/components';
import { actions as talentActions } from '~/bundles/talent/store';
import { type BsaBadgesStepDto } from '~/bundles/talent/types/types';

const BsaBadges: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();
    const { badges: badgesStepData } = useAppSelector(({ talents }) => talents);

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handleSubmit = useCallback(
        async (payload: BsaBadgesStepDto): Promise<void> => {
            const result = await dispatch(
                talentActions.updateOnboardingData(payload),
            );

            if (result.payload) {
                const setStepResult = dispatch(
                    talentActions.setCompletedStep(
                        TalentOnboardingScreenName.BSA_BADGES,
                    ),
                );
                if (setStepResult.payload) {
                    navigate(TalentOnboardingScreenName.SKILLS_AND_PROJECTS, {
                        stepState: TalentOnboardingStepState.FOCUSED,
                    });
                }
            }
        },
        [dispatch, navigate],
    );

    const handleBadgesSubmit = (payload: BsaBadgesStepDto): void => {
        void handleSubmit(payload);
    };

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <BsaBadgesForm
                key={JSON.stringify(badgesStepData?.badges)}
                badgesStepData={badgesStepData}
                onSubmit={handleBadgesSubmit}
            />
        </View>
    );
};

export { BsaBadges };
