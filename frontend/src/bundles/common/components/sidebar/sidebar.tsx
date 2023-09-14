import { EmailRounded, FolderShared } from '@mui/icons-material';

import { Grid, Link, Logo } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

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
    return (
        <Grid className={styles.wrapper}>
            <Grid className={styles.logo}>
                <Logo isCollapsed={true} withLink />
            </Grid>

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
    );
};

export { Sidebar };
