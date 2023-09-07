import logoSvg from '~/assets/img/logo/logo.svg';
import logoLabelSvg from '~/assets/img/logo/logo-label.svg';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { Grid, Link } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    className?: string;
    isCollapsed?: boolean;
    link?: ValueOf<typeof AppRoute>;
};

const BaseLogo: React.FC<Properties> = ({ isCollapsed }) => {
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
                <img src={logoSvg} alt="Logo-BSATalents" />
            </Grid>

            {!isCollapsed && (
                <Grid item alignItems="center" className={styles.logoLabel}>
                    <img src={logoLabelSvg} alt="Label-BSATalents" />
                </Grid>
            )}
        </>
    );
};

const Logo: React.FC<Properties> = ({
    className = '',
    isCollapsed = false,
    link = { AppRoute },
}) => {
    return (
        <Grid container>
            {link === AppRoute.ROOT ? (
                <Link
                    to={link}
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
