import { Grid, Link, Logo } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

import styles from './styles.module.scss';

const NUM_CUBES = 8;

const Landing: React.FC = () => {
    return (
        <Grid container className={styles.pageContainer}>
            <Link to={AppRoute.SIGN_IN}>
                <Logo className={styles.logo} />
            </Link>

            {Array.from({ length: NUM_CUBES }).map((_, index) => (
                <div key={index} className="cube"></div>
            ))}
        </Grid>
    );
};

export { Landing };
