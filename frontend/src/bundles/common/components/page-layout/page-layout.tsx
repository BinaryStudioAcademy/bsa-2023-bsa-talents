import { Grid, Header, Sidebar } from '../../components/components.js';
import { getValidClassNames } from '../../helpers/helpers.js';
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
    <Grid container className={getValidClassNames(styles.pageContainer)}>
        <Sidebar />
        <Grid item className={getValidClassNames(styles.mainContainer)}>
            <Header avatarUrl={avatarUrl} isOnline={isOnline} />
            <Grid item className={getValidClassNames(styles.mainContent)}>
                {children}
            </Grid>
        </Grid>
    </Grid>
);

export { PageLayout };
