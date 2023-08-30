import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { Grid, Link, Typography } from '../components.js';
import styles from './styles.module.scss';

// type Properties = {}; ---- React.FC<Properties>

const NotFound: React.FC = () => (
    <div className={getValidClassNames(styles.notFoundWrapper)}>
        <Grid
            container
            className={getValidClassNames(styles.notFoundContainer)}
        >
            <Grid item>
                <div className={getValidClassNames(styles.notFoundContent)}>
                    <Typography
                        variant="h4"
                        className={getValidClassNames(styles.title)}
                    >
                        404 Page Not Found
                    </Typography>
                    <Typography
                        variant="body1"
                        className={getValidClassNames(styles.description)}
                    >
                        Oops! The page you&apos;re looking for does not exist.{' '}
                        <br />
                        Don&apos;t worry, we&apos;re here to help you navigate
                        the BSATalents website.
                    </Typography>

                    <Link
                        to={AppRoute.ROOT}
                        className={getValidClassNames(styles.action)}
                    >
                        Return to Main
                    </Link>
                </div>
            </Grid>
        </Grid>

        <div className={getValidClassNames(styles.cube)}></div>
        <div className={getValidClassNames(styles.cube)}></div>
        <div className={getValidClassNames(styles.cube)}></div>
        <div className={getValidClassNames(styles.cube)}></div>
        <div className={getValidClassNames(styles.cube)}></div>
        <div className={getValidClassNames(styles.cube)}></div>
    </div>
);

export { NotFound };
