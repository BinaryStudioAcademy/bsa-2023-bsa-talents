import { Grid, Header, Sidebar } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    children: React.ReactNode;
    avatarUrl: string;
    isOnline: boolean;
};

const PageLayout: React.FC<Properties> = ({
    children,
    avatarUrl,
    isOnline,
}) => {
    return (
        <Grid className={styles.pageWrapper}>
            <Sidebar />
            <Header avatarUrl={avatarUrl} isOnline={isOnline} />
            {children}
        </Grid>
    );
};

export { PageLayout };
