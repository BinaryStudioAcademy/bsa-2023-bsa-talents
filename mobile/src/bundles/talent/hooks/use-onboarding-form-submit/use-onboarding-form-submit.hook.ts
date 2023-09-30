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
import { actions as commonActions } from '~/bundles/common/store';
import {
    type HardSkillsRequest,
    type NavigationProp,
    type TalentOnboardingNavigationParameterList,
    type ValueOf,
} from '~/bundles/common/types/types';
import {
    getNextStepTitle,
    urlObjectsToStrings,
} from '~/bundles/talent/helpers/helpers';
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
    | (Omit<SkillsStepDto, 'hardSkills'> & HardSkillsRequest)
    | CvAndContactsFormDto;

type SubmitOnboardingData = (payload: OnboardingFormData) => Promise<void>;

const useOnboardingFormSubmit = ({
    stepNumber,
    stepTitle,
}: Properties): SubmitOnboardingData => {
    const dispatch = useAppDispatch();
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const { onboardingData } = useAppSelector(({ common }) => common);
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

            const result = await dispatch(
                commonActions.updateOnboardingData(updatedPayload),
            );

            if (result.payload) {
                const nextStepTitle = getNextStepTitle(stepNumber);
                if (nextStepTitle) {
                    navigation.setParams({
                        stepState: TalentOnboardingStepState.COMPLETED,
                    });
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
            completedOnboardingStep,
        ],
    );
};

export { useOnboardingFormSubmit };
