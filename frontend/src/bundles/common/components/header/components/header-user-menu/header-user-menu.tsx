import { type MenuItemProps } from '@mui/base/MenuItem';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { actions as storeActions } from '~/app/store/app.js';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Menu,
    MenuItem,
    Typography,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { NotificationType } from '~/services/notification/enums/notification-types.enum.js';

import styles from './styles.module.scss';

type Properties = MenuItemProps;

const HeaderUserMenu: React.FC<Properties> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignOut = useCallback((): void => {
        void dispatch(authActions.signOut());
        void dispatch(authActions.resetEntireStore());
        void dispatch(
            storeActions.notify({
                type: NotificationType.INFO,
                message: 'You are logged out',
            }),
        );
        navigate(AppRoute.SIGN_IN);
    }, [dispatch, navigate]);

    return (
        <Menu>
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
