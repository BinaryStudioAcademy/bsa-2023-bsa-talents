import clsx from 'clsx';

import logoSvg from '~/assets/img/logo.svg';

import { Grid, Typography } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    isCollapsed?: boolean;
};

const Logo = ({ isCollapsed = false }: Properties): JSX.Element => {
    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            className={styles.logo}
        >
            <Grid
                item
                className={clsx(
                    styles.logoIcon,
                    isCollapsed && styles.collapsed,
                )}
            >
                <img src={logoSvg} alt="Logo" />
            </Grid>
            {!isCollapsed && (
                <Grid item alignItems="center">
                    <Typography variant="h1">
                        <span className={styles.textFirst}>BSA</span>
                        <span className={styles.textSecond}>Talents</span>
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export { Logo };
