import {
    Grid,
    Header,
    Sidebar,
} from '~/bundles/common/components/components.js';

import { useAppSelector } from '../../hooks/hooks.js';
import styles from './styles.module.scss';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
    isWaitingForApproval?: boolean;
    children: React.ReactNode;
};

const PageLayout: React.FC<Properties> = ({
    avatarUrl,
    isWaitingForApproval,
    isOnline,
    children,
}) => {
    const { role } = useAppSelector(({ auth }) => ({
        role: auth.currentUser?.role,
    }));

    return (
        <Grid container className={styles.pageContainer}>
            <Sidebar role={role} />

            <Header
                avatarUrl={avatarUrl}
                isWaitingForApproval={isWaitingForApproval}
                isOnline={isOnline}
                className={styles.mainHeader}
            />

            <Grid item className={styles.mainContainer}>
                <Grid item className={styles.mainContent}>
                    {children}
                </Grid>
            </Grid>
        </Grid>
    );
};

export { PageLayout };
