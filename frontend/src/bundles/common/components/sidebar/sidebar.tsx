import { EmailRounded, FolderShared } from '@mui/icons-material';

import { Grid, Link, Logo } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { useAppSelector, useCallback, useState } from '../../hooks/hooks.js';
import styles from './styles.module.scss';

const menuItems = [
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

const Sidebar: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const { isApproved } = useAppSelector(
        (state: RootReducer) => state.talentOnBoarding,
    );

    const handleToggleSidebar = useCallback(() => {
        setSidebarVisible(!isSidebarVisible);
    }, [isSidebarVisible]);

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
                        <li
                            key={item.link}
                            className={isApproved ? '' : styles.listItem}
                        >
                            <Link
                                to={`${
                                    isApproved ? item.link : AppRoute.SAME_PAGE
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
