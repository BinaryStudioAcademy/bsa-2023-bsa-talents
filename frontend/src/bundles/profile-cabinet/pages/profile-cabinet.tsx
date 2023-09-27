import { UserRole } from 'shared/build/index.js';

import { actions as storeActions } from '~/app/store/app.js';
import {
    Button,
    FormControl,
    Grid,
    PageLayout,
    RouterOutlet,
    Tab,
    Tabs,
    Typography,
} from '~/bundles/common/components/components.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { OnboardingForm } from '~/bundles/employer-onboarding/components/onboarding-form/onboarding-form.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';
import { type RootReducer } from '~/framework/store/store.js';
import { NotificationType } from '~/services/notification/enums/notification-type.enum.js';

import styles from './styles.module.scss';

const ProfileCabinet: React.FC = () => {
    const role = useAppSelector((state) => state.auth.currentUser?.role);
    let tabNavigation = <></>;
    switch (role) {
        case UserRole.TALENT: {
            tabNavigation = (
                <Tabs>
                    <Tab
                        label="Profile"
                        href={`/${role}/my/${StepsRoute.STEP_01}`}
                    />
                    <Tab
                        label="BSA badges"
                        href={`/${role}/my/${StepsRoute.STEP_02}`}
                    />
                    <Tab
                        label="Skills and projects"
                        href={`/${role}/my/${StepsRoute.STEP_03}`}
                    />
                    <Tab
                        label="CV and contacts"
                        href={`/${role}/my/${StepsRoute.STEP_04}`}
                    />
                </Tabs>
            );
            break;
        }
        case UserRole.EMPLOYER: {
            tabNavigation = <></>;
            break;
        }
        default: {
            break;
        }
    }
    const { submitForm } = useFormSubmit();
    const dispatch = useAppDispatch();
    const { hasChanges } = useAppSelector((state: RootReducer) => ({
        hasChanges: state.cabinet.hasChangesInDetails,
    }));

    const handleSaveClick = useCallback(() => {
        void (async (): Promise<void> => {
            if (submitForm) {
                const isSuccessful = await submitForm();
                if (isSuccessful) {
                    void dispatch(
                        storeActions.notify({
                            type: NotificationType.SUCCESS,
                            message: 'Profile was updated',
                        }),
                    );
                }
            }
        })();
    }, [dispatch, submitForm]);

    return (
        <PageLayout avatarUrl="" isOnline>
            <Grid className={styles.pageTitle}>
                <Typography variant="h4">Your Profile</Typography>
            </Grid>
            <Grid className={styles.pageWrapper}>
                <Grid className={styles.headNavigation}>
                    <Grid className={styles.tabNavigation}>
                        {tabNavigation}
                    </Grid>
                </Grid>
                <Grid
                    className={getValidClassNames(
                        styles.stepContainer,
                        styles[`${role}`],
                    )}
                >
                    <FormControl className={styles.form}>
                        {role == UserRole.TALENT ? (
                            <RouterOutlet />
                        ) : (
                            <OnboardingForm />
                        )}
                        <Button
                            onClick={handleSaveClick}
                            label={'Save'}
                            variant={'contained'}
                            isDisabled={!hasChanges}
                            className={styles.saveButton}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export { ProfileCabinet };
