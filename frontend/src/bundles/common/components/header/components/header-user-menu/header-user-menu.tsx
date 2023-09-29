import { type MenuItemProps } from '@mui/base/MenuItem';
import { Logout, Person } from '@mui/icons-material';

import { actions as storeActions } from '~/app/store/app.js';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Menu,
    MenuItem,
    Typography,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLocation,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { configureString } from '~/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = MenuItemProps;

const HeaderUserMenu: React.FC<Properties> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isProfileDisabled, setIsProfileDisabled] = useState<boolean>(true);

    const handleSignOut = useCallback((): void => {
        void dispatch(authActions.signOut());
        void dispatch(storeActions.resetStore());
        navigate(AppRoute.SIGN_IN);
    }, [dispatch, navigate]);

    const role = useAppSelector((state) => state.auth.currentUser?.role);

    const isAdmin = role === 'admin';

    const handleCheckProfile = useCallback((): void => {
        navigate(configureString('/:role/my/profile', { role }));
    }, [navigate, role]);

    useEffect(() => {
        pathname.includes('onboarding') && !pathname.includes('preview')
            ? setIsProfileDisabled(true)
            : setIsProfileDisabled(false);
    }, [pathname]);

    return (
        <Menu>
            {!isAdmin && (
                <MenuItem
                    onClick={handleCheckProfile}
                    disabled={isProfileDisabled}
                >
                    <Person fontSize="small" />
                    <Typography variant="h6" className={styles.menuItem}>
                        My profile
                    </Typography>
                </MenuItem>
            )}
            <MenuItem onClick={handleSignOut}>
                <Logout fontSize="small" className={styles.signOutIcon} />
                <Typography variant="h6" className={styles.signOut}>
                    Sign Out
                </Typography>
            </MenuItem>
        </Menu>
    );
};

export { HeaderUserMenu };
