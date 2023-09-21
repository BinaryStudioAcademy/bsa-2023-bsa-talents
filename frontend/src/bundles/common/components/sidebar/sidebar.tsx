import { EmailRounded, FolderShared, Home } from '@mui/icons-material';

import { Grid, Link, Logo } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { useCallback, useState } from '../../hooks/hooks.js';
import { type UserRole, type ValueOf } from '../../types/types.js';
import styles from './styles.module.scss';

type Properties = {
    role?: ValueOf<typeof UserRole>;
};

const generalMenu = [
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

const adminMenu = [
    {
        link: AppRoute.ROOT,
        name: 'Home',
        icon: <Home />,
    },
];

const Sidebar: React.FC<Properties> = ({ role }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const handleToggleSidebar = useCallback(() => {
        setSidebarVisible(!isSidebarVisible);
    }, [isSidebarVisible]);

    const menuItems = role === 'admin' ? adminMenu : generalMenu;

    return (
        <>
            <Grid
                className={getValidClassNames(
                    isSidebarVisible ? styles.visible : styles.hidden,
                    styles.wrapper,
                )}
            >
                <Logo isCollapsed={true} className={styles.logo} withLink />
                <ul className={styles.list}>
                    {menuItems.map((item) => (
                        <li key={item.link} className={styles.listItem}>
                            <Link className={styles.link} to={item.link}>
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
