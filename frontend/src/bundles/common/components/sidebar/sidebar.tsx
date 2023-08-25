import { Link } from '~/bundles/common/components/components.js';
import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import styles from './styles.module.scss';

type TSidebarMenuItem = {
    link: ValueOf<typeof AppRoute>;
    name: string;
    icon: JSX.Element;
};

type Properties = {
    menuItems?: TSidebarMenuItem[];
};

const Sidebar: React.FC<Properties> = ({ menuItems = [] }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}></div>
            <ul className={styles.list}>
                {menuItems.map((item) => (
                    <li
                        key={item.link}
                        className={getValidClassNames(styles.listItem)}
                    >
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
