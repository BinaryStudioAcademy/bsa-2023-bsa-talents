import { Grid, Header, Sidebar } from '../../components/components.js';
import styles from './styles.module.scss';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
    children: React.ReactNode;
};

const PageLayout: React.FC<Properties> = ({
    avatarUrl,
    isOnline,
    children,
}) => (
    <Grid container className={styles.pageContainer}>
        <Sidebar />
        <Grid item className={styles.mainContainer}>
            <Header
                avatarUrl={avatarUrl}
                isOnline={isOnline}
                className={styles.mainHeader}
            />
            <Grid item className={styles.mainContent}>
                {children}
            </Grid>
        </Grid>
    </Grid>
);

export { PageLayout };
