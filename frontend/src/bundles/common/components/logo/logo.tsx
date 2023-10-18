import logoSvg from '~/assets/img/logo/logo.svg';
import logoLabelSvg from '~/assets/img/logo/logo-label.svg';
import { AppRoute, UserRole } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import { type RootReducer } from '~/framework/store/store.js';

import {
    useAppSelector,
    useEffect,
    useLocation,
    useState,
} from '../../hooks/hooks.js';
import { Grid, Link } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    className?: string;
    isCollapsed?: boolean;
    hasLink?: boolean;
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
    hasLink = false,
}) => {
    const { pathname } = useLocation();
    const role = useAppSelector(
        (state: RootReducer) => state.auth.currentUser?.role,
    );
    const [isProfileDisabled, setIsProfileDisabled] = useState<boolean>(true);

    let logoLink = '';

    switch (role) {
        case UserRole.TALENT: {
            logoLink = configureString('/:role/my/profile', { role });
            break;
        }
        case UserRole.EMPLOYER: {
            logoLink = AppRoute.CANDIDATES;
            break;
        }
        case UserRole.ADMIN: {
            logoLink = AppRoute.ADMIN_VERIFICATIONS_PANEL;
            break;
        }
        default: {
            break;
        }
    }

    useEffect(() => {
        pathname.includes('onboarding') && !pathname.includes('preview')
            ? setIsProfileDisabled(true)
            : setIsProfileDisabled(false);
    }, [pathname]);

    return (
        <Grid container alignItems="center" justifyContent="center">
            {hasLink ? (
                <Link
                    to={isProfileDisabled ? AppRoute.SAME_PAGE : logoLink}
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
