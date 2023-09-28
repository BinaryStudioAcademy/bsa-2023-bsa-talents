import { UserRole } from 'shared/build/index.js';

import {
    Grid,
    Header,
    Sidebar,
} from '~/bundles/common/components/components.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

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
    const role = useAppSelector((state) => state.auth.currentUser?.role);
    const isAdminUser = role === UserRole.ADMIN;
    return (
        <Grid container className={styles.pageContainer}>
            <Sidebar />

            <Header
                avatarUrl={avatarUrl}
                isWaitingForApproval={isWaitingForApproval}
                isOnline={isOnline}
                isAdmin={isAdminUser}
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
