import { Grid, Logo } from '~/bundles/common/components/components.js';

import styles from './styles.module.scss';

const NUM_CUBES = 8;

const Landing: React.FC = () => {
    return (
        <Grid container className={styles.pageContainer}>
            <Logo className={styles.logo} />

            {Array.from({ length: NUM_CUBES }).map((_, index) => (
                <div key={index} className="cube"></div>
            ))}
        </Grid>
    );
};

export { Landing };
