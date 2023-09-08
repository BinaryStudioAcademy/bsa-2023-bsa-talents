import { EmailRounded, FolderShared } from '@mui/icons-material';

import { Link, Logo } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { useCallback, useState } from '../../hooks/hooks.js';
import styles from './styles.module.scss';

const menuItems = [
    {
        link: AppRoute.ROOT,
        name: 'Candidates',
        icon: <FolderShared />,
    },
    {
        link: AppRoute.SIGN_UP,
        name: 'Chats',
        icon: <EmailRounded />,
    },
];

const Sidebar: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const handleToggleSidebar = useCallback(() => {
        setSidebarVisible(!isSidebarVisible);
    }, [isSidebarVisible]);

    return (
        <>
            <div
                className={getValidClassNames(
                    isSidebarVisible ? styles.visible : styles.hidden,
                    styles.wrapper,
                )}
            >
                <Logo isCollapsed={true} className={styles.logo} />
                <ul className={styles.list}>
                    {menuItems.map((item) => (
                        <li key={item.link} className={styles.listItem}>
                            <Link to={item.link}>
                                {item.icon}
                                <p className={styles.title}>{item.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

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
