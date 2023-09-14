import { type NavigationProp } from '@react-navigation/native';

import {
    CompletedTalentOnboardingStep,
    type TalentOnboardingScreenName,
    TalentOnboardingStepState,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import {
    type TalentOnboardingNavigationParameterList,
    type ValueOf,
} from '~/bundles/common/types/types';
import {
    getNextStepTitle,
    urlObjectsToStrings,
} from '~/bundles/talent/helpers/helpers';
import { actions as talentActions } from '~/bundles/talent/store';
import {
    type BsaBadgesStepDto,
    type CvAndContactsFormDto,
    type ProfileStepDto,
    type SkillsStepDto,
} from '~/bundles/talent/types/types';

type Properties = {
    stepNumber: number;
    stepTitle: ValueOf<typeof TalentOnboardingScreenName>;
    isNewTalentOnboardingData?: boolean;
};

type OnboardingFormData =
    | ProfileStepDto
    | BsaBadgesStepDto
    | SkillsStepDto
    | CvAndContactsFormDto;

type SubmitOnboardingData = (payload: OnboardingFormData) => Promise<void>;

const useOnboardingFormSubmit = ({
    stepNumber,
    stepTitle,
    isNewTalentOnboardingData = false,
}: Properties): SubmitOnboardingData => {
    const dispatch = useAppDispatch();
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const userId = currentUserData?.id ?? '';

    const completedOnboardingStep = CompletedTalentOnboardingStep[stepTitle];

    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    return useCallback(
        async (payload: OnboardingFormData): Promise<void> => {
            const updatePayload = {
                ...payload,
                userId,
                projectLinks: urlObjectsToStrings(
                    (payload as SkillsStepDto).projectLinks,
                ),
                completedStep: completedOnboardingStep,
            };

            const createPayload = {
                ...updatePayload,
                fullName: (payload as ProfileStepDto).profileName,
            };

            const result = isNewTalentOnboardingData
                ? await dispatch(
                      talentActions.createTalentDetails(createPayload),
                  )
                : await dispatch(
                      talentActions.updateOnboardingData(updatePayload),
                  );

            if (result.payload) {
                const nextStepTitle = getNextStepTitle(stepNumber);
                if (nextStepTitle) {
                    navigate(nextStepTitle, {
                        stepState: TalentOnboardingStepState.FOCUSED,
                    });
                }
            }
        },
        [
            dispatch,
            navigate,
            userId,
            stepNumber,
            isNewTalentOnboardingData,
            completedOnboardingStep,
        ],
    );
};

export { useOnboardingFormSubmit };
