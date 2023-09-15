import logoSvg from '~/assets/img/logo/logo.svg';
import logoLabelSvg from '~/assets/img/logo/logo-label.svg';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { Grid, Link } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    className?: string;
    isCollapsed?: boolean;
    withLink?: boolean;
};

const BaseLogo: React.FC<{ isCollapsed?: boolean }> = ({ isCollapsed }) => {
    return (
        <>
            <Grid
                item
                alignItems="center"
                className={getValidClassNames(
                    styles.logoIcon,
                    isCollapsed && styles.collapsed,
                )}
            >
                <img
                    className={styles.logoImg}
                    src={logoSvg}
                    alt="Logo-BSATalents"
                />
            </Grid>

            {!isCollapsed && (
                <Grid item alignItems="center" className={styles.logoLabel}>
                    <img
                        className={styles.logoImg}
                        src={logoLabelSvg}
                        alt="Label-BSATalents"
                    />
                </Grid>
            )}
        </>
    );
};

const Logo: React.FC<Properties> = ({
    className = '',
    isCollapsed = false,
    withLink = false,
}) => {
    return (
        <Grid container alignItems="center" justifyContent="center">
            {withLink ? (
                <Link
                    to={AppRoute.ROOT}
                    className={getValidClassNames(styles.logo, className)}
                >
                    <BaseLogo isCollapsed={isCollapsed} />
                </Link>
            ) : (
                <Grid
                    container
                    className={getValidClassNames(styles.logo, className)}
                >
                    <BaseLogo isCollapsed={isCollapsed} />
                </Grid>
            )}
        </Grid>
    );
};

export { Logo };
