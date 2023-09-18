import {
    Button,
    Grid,
    PageLayout,
    Typography,
} from '~/bundles/common/components/components.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { OnboardingForm } from '../../components/onboarding-form/onboarding-form.js';
import styles from './styles.module.scss';

const Onboarding: React.FC = () => {
    const { submitForm } = useFormSubmit();

    const handleFormSubmit = useCallback(() => {
        void (async (): Promise<void> => {
            if (submitForm) {
                await submitForm();
            }
        });
    }, [submitForm]);

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
                                onClick={handleFormSubmit}
                                label="Preview"
                                className={getValidClassNames(
                                    styles.buttonRegistration,
                                    styles.previewButton,
                                )}
                            />
                            <Button
                                type="submit"
                                onClick={handleFormSubmit}
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
