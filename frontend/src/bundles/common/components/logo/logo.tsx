import clsx from 'clsx';

import logoSvg from '~/assets/img/logo/logo.svg';
import logoLabelSvg from '~/assets/img/logo/logo-label.svg';

import { Grid } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    isCollapsed?: boolean;
};

const Logo = ({ isCollapsed = false }: Properties): JSX.Element => {
    return (
        <Grid container className={styles.logo}>
            <Grid
                item
                alignItems="center"
                className={clsx(
                    styles.logoIcon,
                    isCollapsed && styles.collapsed,
                )}
            >
                <img src={logoSvg} alt="Logo-BSATalents" />
            </Grid>

            {!isCollapsed && (
                <Grid item alignItems="center" className={styles.logoLabel}>
                    <img src={logoLabelSvg} alt="Label-BSATalents" />
                </Grid>
            )}
        </Grid>
    );
};

export { Logo };
