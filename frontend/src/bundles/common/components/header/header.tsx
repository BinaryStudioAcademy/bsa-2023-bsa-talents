import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
};

const Header: React.FC<Properties> = ({ avatarUrl, isOnline }) => {
    const statusCLasses = getValidClassNames(
        styles.status,
        isOnline ? styles.online : styles.offline,
    );
    return (
        <header className={styles.header}>
            <div className={styles.avatar}>
                <img src={avatarUrl} alt="User Avatar" />
                <div className={statusCLasses} />
            </div>
        </header>
    );
};

export { Header };
