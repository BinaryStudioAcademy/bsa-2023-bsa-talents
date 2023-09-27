import {
    EmailRounded,
    FolderShared,
    Home,
    PeopleRounded,
} from '@mui/icons-material';

import { Grid, Link, Logo } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { UserRole } from '~/bundles/users/users.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { useAppSelector, useCallback, useState } from '../../hooks/hooks.js';
import styles from './styles.module.scss';
import { type SideBarMenu } from './types/sidebar-menu.type.js';

const GENERAL_MENU_ITEMS: SideBarMenu = [
    {
        link: AppRoute.CANDIDATES,
        name: 'Candidates',
        icon: <FolderShared />,
    },
    {
        link: AppRoute.CHATS,
        name: 'Chats',
        icon: <EmailRounded />,
    },
];

const ADMIN_MENU_ITEMS: SideBarMenu = [
    {
        link: AppRoute.ADMIN_VERIFICATIONS_PANEL,
        name: 'Home',
        icon: <Home />,
    },
    {
        link: AppRoute.ADMIN_CONNECTIONS_PANEL,
        name: 'Connections',
        icon: <PeopleRounded />,
    },
];

const Sidebar: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const currentUser = useAppSelector(
        (state: RootReducer) => state.auth.currentUser,
    );
    const { isApproved } = useAppSelector((state: RootReducer) =>
        currentUser?.role == UserRole.TALENT
            ? state.talentOnBoarding
            : state.employerOnBoarding,
    );
    const isAdmin = currentUser?.role === 'admin';
    const handleToggleSidebar = useCallback(() => {
        setSidebarVisible(!isSidebarVisible);
    }, [isSidebarVisible]);

    const menuItems = isAdmin ? ADMIN_MENU_ITEMS : GENERAL_MENU_ITEMS;

    return (
        <>
            <Grid
                className={getValidClassNames(
                    isSidebarVisible ? styles.visible : styles.hidden,
                    styles.wrapper,
                )}
            >
                <Logo isCollapsed={true} className={styles.logo} hasLink />
                <ul className={styles.list}>
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={
                                isAdmin || isApproved ? '' : styles.listItem
                            }
                        >
                            <Link
                                to={`${
                                    isAdmin || isApproved
                                        ? item.link
                                        : AppRoute.SAME_PAGE
                                }`}
                            >
                                {item.icon}
                                <p className={styles.title}>{item.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Grid>

            {/* BURGER */}
            <div className={styles.burgerBackground}></div>
            <div className={styles.burgerWrapper}>
                <button
                    onClick={handleToggleSidebar}
                    className={getValidClassNames(
                        isSidebarVisible && styles.checked,
                        styles.burgerButton,
                    )}
                ></button>
            </div>
        </>
    );
};

export { Sidebar };
