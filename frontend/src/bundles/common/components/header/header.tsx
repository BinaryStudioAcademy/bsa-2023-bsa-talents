import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
    className?: string;
};

const Header: React.FC<Properties> = ({ avatarUrl, isOnline, className }) => {
    const statusCLasses = getValidClassNames(
        styles.status,
        isOnline ? styles.online : styles.offline,
    );
    return (
        <header className={getValidClassNames(styles.header, className)}>
            <div className={styles.avatar}>
                <img src={avatarUrl} alt="User Avatar" />
                <div className={statusCLasses} />
            </div>
        </header>
    );
};

export { Header };
