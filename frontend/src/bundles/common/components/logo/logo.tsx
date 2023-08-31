import logoSvg from '~/assets/img/logo/logo.svg';
import logoLabelSvg from '~/assets/img/logo/logo-label.svg';

import { getValidClassNames } from '../../helpers/helpers.js';
import { Grid } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    className?: string;
    isCollapsed?: boolean;
};

const Logo = ({
    className = '',
    isCollapsed = false,
}: Properties): JSX.Element => {
    return (
        <Grid container className={getValidClassNames(styles.logo, className)}>
            <Grid
                item
                alignItems="center"
                className={getValidClassNames(
                    styles.logoIcon,
                    isCollapsed && styles.collapsed,
                )}
            >
                <img src={logoSvg} alt="Logo-BSATalents" />
            </Grid>

            {!isCollapsed && (
                <Grid
                    item
                    alignItems="center"
                    className={getValidClassNames(styles.logoLabel)}
                >
                    <img src={logoLabelSvg} alt="Label-BSATalents" />
                </Grid>
            )}
        </Grid>
    );
};

export { Logo };
