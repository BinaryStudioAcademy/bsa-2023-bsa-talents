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
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { type RootReducer } from '~/framework/store/store.js';
import { NotificationType } from '~/services/notification/enums/notification-types.enum.js';

import styles from './styles.module.scss';

const ProfileCabinet: React.FC = () => {
    const { submitForm } = useFormSubmit();
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state: RootReducer) => state.auth);
    useEffect(() => {
        void dispatch(
            actions.getTalentDetails({
                userId: currentUser?.id,
            }),
        );
    }, [currentUser?.id, dispatch]);

    const handleSaveClick = useCallback(() => {
        void (async (): Promise<void> => {
            if (submitForm) {
                const success = await submitForm();
                if (success) {
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
            <Grid className={styles.pageWrapper}>
                <Grid className={styles.headNavigation}>
                    <Grid>
                        <Typography variant="h4" className={''}>
                            Your Profile
                        </Typography>
                    </Grid>
                    <Grid className={styles.tabNavigation}>
                        <Tabs>
                            <Tab label="Profile" href="/my/profile" />
                            <Tab label="BSA badges" href="/my/bsa-badges" />
                            <Tab
                                label="Skills and projects"
                                href="/my/skills-and-projects"
                            />
                            <Tab
                                label="CV and contacts"
                                href="/my/cv-and-contacts"
                            />
                        </Tabs>
                    </Grid>
                </Grid>
                <Grid className={styles.stepContainer}>
                    <FormControl className={styles.form}>
                        {<RouterOutlet />}
                        <Button
                            onClick={handleSaveClick}
                            label={'Save'}
                            variant={'contained'}
                            className={styles.saveButton}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export { ProfileCabinet };
