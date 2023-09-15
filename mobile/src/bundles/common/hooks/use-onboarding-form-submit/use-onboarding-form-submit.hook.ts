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
    const { onboardingData } = useAppSelector(({ talents }) => talents);
    const userId = currentUserData?.id ?? '';

    const completedOnboardingStep = CompletedTalentOnboardingStep[stepTitle];

    const navigation =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    return useCallback(
        async (payload: OnboardingFormData): Promise<void> => {
            const isProjectLinksExist = 'projectLinks' in payload;

            const updatedProjectLinks = isProjectLinksExist
                ? urlObjectsToStrings(payload.projectLinks)
                : onboardingData?.projectLinks;

            const updatedPayload = {
                ...payload,
                userId,
                projectLinks: updatedProjectLinks ?? [],
                completedStep: completedOnboardingStep,
            };

            const createdPayload = {
                ...updatedPayload,
                fullName: (payload as ProfileStepDto).profileName,
            };

            const result = isNewTalentOnboardingData
                ? await dispatch(
                      talentActions.createTalentDetails(createdPayload),
                  )
                : await dispatch(
                      talentActions.updateOnboardingData(updatedPayload),
                  );

            if (result.payload) {
                const nextStepTitle = getNextStepTitle(stepNumber);
                if (nextStepTitle) {
                    navigation.setParams({ stepState: 'completed' });
                    navigation.navigate(nextStepTitle, {
                        stepState: TalentOnboardingStepState.FOCUSED,
                    });
                }
            }
        },
        [
            navigation,
            onboardingData,
            dispatch,
            userId,
            stepNumber,
            isNewTalentOnboardingData,
            completedOnboardingStep,
        ],
    );
};

export { useOnboardingFormSubmit };
