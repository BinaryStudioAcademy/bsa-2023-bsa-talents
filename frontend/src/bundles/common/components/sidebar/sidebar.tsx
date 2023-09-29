import {
    EmailRounded,
    FolderShared,
    Home,
    PeopleRounded,
} from '@mui/icons-material';

import { Grid, Logo } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { UserRole } from '~/bundles/users/users.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { useAppSelector, useCallback, useState } from '../../hooks/hooks.js';
import { SidebarItem } from './sidebar-item/sidebar-item.js';
import styles from './styles.module.scss';
import { type SideBarMenu } from './types/sidebar-menu.type.js';
import { type SidebarMenuItem } from './types/sidebar-menu-item.type.js';

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

    const handleToggleSidebar = useCallback(() => {
        setSidebarVisible(!isSidebarVisible);
    }, [isSidebarVisible]);

    let menuItems: SideBarMenu = [];

    switch (currentUser?.role) {
        case UserRole.TALENT: {
            menuItems = [
                GENERAL_MENU_ITEMS.find(
                    (item) => item.name === 'Chats',
                ) as SidebarMenuItem,
            ];
            break;
        }
        case UserRole.EMPLOYER: {
            menuItems = GENERAL_MENU_ITEMS;
            break;
        }
        case UserRole.ADMIN: {
            menuItems = ADMIN_MENU_ITEMS;
            break;
        }
        default: {
            break;
        }
    }

    return (
        <>
            <Grid
                className={getValidClassNames(
                    isSidebarVisible ? styles.visible : styles.hidden,
                    styles.wrapper,
                    currentUser?.role === UserRole.ADMIN && styles.adminSidebar,
                )}
            >
                <Logo isCollapsed={true} className={styles.logo} hasLink />
                <ul className={styles.list}>
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.name}
                            icon={item.icon}
                            link={item.link}
                            name={item.name}
                        />
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
