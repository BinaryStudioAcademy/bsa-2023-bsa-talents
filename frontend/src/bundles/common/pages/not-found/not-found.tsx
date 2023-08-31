import { Grid, Link, Logo, Typography } from '../../components/components.js';
import { AppRoute } from '../../enums/app-route.enum.js';
import { getValidClassNames } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

const NotFoundPage: React.FC = () => {
    return (
        <Grid
            container
            xs={12}
            className={getValidClassNames(styles.pageContainer)}
        >
            <Grid item className={getValidClassNames(styles.header)}>
                <Logo />
            </Grid>

            <Grid item xs={12} className={getValidClassNames(styles.text)}>
                <Typography
                    variant="body1"
                    className={getValidClassNames(styles.description)}
                >
                    The page you are looking for can’t be found.
                </Typography>
                <Typography
                    variant="h1"
                    className={getValidClassNames(styles.code)}
                >
                    404
                </Typography>
            </Grid>

            <Grid item xs={12} className={getValidClassNames(styles.link)}>
                <Link to={AppRoute.ROOT}>Return to Main</Link>
            </Grid>

            <div className={getValidClassNames(styles.cube)}></div>
            <div className={getValidClassNames(styles.cube)}></div>
            <div className={getValidClassNames(styles.cube)}></div>
            <div className={getValidClassNames(styles.cube)}></div>
            <div className={getValidClassNames(styles.cube)}></div>
            <div className={getValidClassNames(styles.cube)}></div>
        </Grid>
    );
};

export { NotFoundPage };
