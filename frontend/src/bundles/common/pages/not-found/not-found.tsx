import { Grid, Link, Logo, Typography } from '../../components/components.js';
import { AppRoute } from '../../enums/app-route.enum.js';
import styles from './styles.module.scss';

const NotFoundPage: React.FC = () => {
    return (
        <Grid container xs={12} className={styles.pageContainer}>
            <Grid item className={styles.header}>
                <Logo />
            </Grid>

            <Grid item xs={12} className={styles.text}>
                <Typography variant="body1" className={styles.description}>
                    The page you are looking for can’t be found.
                </Typography>
                <Typography variant="h1" className={styles.code}>
                    404
                </Typography>
            </Grid>

            <Grid item xs={12} container className={styles.link}>
                <Link to={AppRoute.ROOT}>Return to Main</Link>
            </Grid>

            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
        </Grid>
    );
};

export { NotFoundPage };
