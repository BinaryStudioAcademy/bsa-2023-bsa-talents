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
import { FormSubmitProvider } from '~/bundles/common/context/context.js';

import styles from './styles.module.scss';

const ProfileCabinet: React.FC = () => {
    return (
        <PageLayout avatarUrl="" isOnline>
            <FormSubmitProvider>
                <Grid className={styles.pageWrapper}>
                    <Grid className={styles.headNavigation}>
                        <Grid>
                            <Typography variant="h4" className={''}>
                                Your Profile
                            </Typography>
                        </Grid>
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
                            <Tab label="Hirings" href="/my/hirings" />
                        </Tabs>
                    </Grid>
                    <Grid className={styles.stepBody}>
                        <FormControl className={styles.form}>
                            {<RouterOutlet />}
                        </FormControl>
                        <Grid>
                            <Button
                                onClick={undefined}
                                label={'Save'}
                                variant={'contained'}
                                //disabled={true}
                                className={styles.saveButton}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </FormSubmitProvider>
        </PageLayout>
    );
};

export { ProfileCabinet };
