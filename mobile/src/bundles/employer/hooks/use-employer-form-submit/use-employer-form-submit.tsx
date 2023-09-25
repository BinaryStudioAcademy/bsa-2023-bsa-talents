import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';
import { actions as commonActions } from '~/bundles/common/store';
import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';

type SubmitOnboardingData = (
    payload: EmployerOnboardingFormDto,
) => Promise<void>;

const useEmployerFormSubmit = (): SubmitOnboardingData => {
    const dispatch = useAppDispatch();
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const { onboardingData } = useAppSelector(({ common }) => common);
    const userId = currentUserData?.id ?? '';
    const isNewEmployerData = !onboardingData?.companyName;

    return useCallback(
        async (payload: EmployerOnboardingFormDto): Promise<void> => {
            const updatedPayload = {
                ...payload,
                userId,
            };

            isNewEmployerData
                ? await dispatch(
                      commonActions.createUserDetails(updatedPayload),
                  )
                : await dispatch(
                      commonActions.updateOnboardingData(updatedPayload),
                  );
        },
        [dispatch, userId, isNewEmployerData],
    );
};

export { useEmployerFormSubmit };
