import { EmailRounded, FolderShared } from '@mui/icons-material';

import { Link, Logo } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

import styles from './styles.module.scss';

const menuItems = [
    {
        link: AppRoute.ROOT,
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
    return (
        <div className={styles.wrapper}>
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
    );
};

export { Sidebar };
