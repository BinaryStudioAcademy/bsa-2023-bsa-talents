import {
    Button,
    Grid,
    PageLayout,
    Typography,
} from '~/bundles/common/components/components.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { actions } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { OnboardingForm } from '../../components/onboarding-form/onboarding-form.js';
import styles from './styles.module.scss';

const Onboarding: React.FC = () => {
    const { submitForm } = useFormSubmit();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { currentUser } = useAppSelector((state: RootReducer) => state.auth);

    const handleFormSubmit = useCallback(
        async (publish: boolean): Promise<void> => {
            if (!currentUser || !submitForm) {
                return;
            }

            await submitForm();
            if (publish) {
                void dispatch(
                    actions.updateTalentPublishedDate({
                        userId: currentUser.id,
                    }),
                );
            }
            navigate(AppRoute.MY_PROFILE_EMPLOYER);
        },
        [currentUser, dispatch, navigate, submitForm],
    );

    const handleFormSave = useCallback(
        () => void handleFormSubmit(false),
        [handleFormSubmit],
    );
    const handleFormPublish = useCallback(
        () => void handleFormSubmit(true),
        [handleFormSubmit],
    );

    return (
        <PageLayout avatarUrl="" isOnline>
            <Grid className={styles.careerWrapper}>
                <Typography variant="h4" className={styles.header}>
                    Create an account to see talents
                </Typography>
                <Grid container className={styles.onboarding}>
                    <Grid className={styles.container}>
                        <Grid className={styles.paragraph}>
                            <Typography variant="h2">
                                Create a profile to find a perfect match to your
                                company
                            </Typography>
                            <Typography variant="body1" className={styles.body}>
                                Please, fill out all the fields below, so we
                                could verify your company.
                            </Typography>
                        </Grid>
                        <OnboardingForm />
                        <Grid>
                            <Button
                                type="submit"
                                variant="outlined"
                                onClick={handleFormSave}
                                label="Save draft"
                                className={getValidClassNames(
                                    styles.buttonRegistration,
                                    styles.previewButton,
                                )}
                            />
                            <Button
                                type="submit"
                                onClick={handleFormPublish}
                                label="Submit for verification"
                                className={getValidClassNames(
                                    styles.buttonRegistration,
                                    styles.submitButton,
                                )}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export { Onboarding };
