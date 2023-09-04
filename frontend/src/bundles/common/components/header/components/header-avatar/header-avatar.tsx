import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
};

const HeaderAvatar: React.FC<Properties> = ({ avatarUrl, isOnline }) => {
    const statusCLasses = getValidClassNames(
        styles.status,
        isOnline ? styles.online : styles.offline,
    );
    return (
        <div className={getValidClassNames(styles.avatar)}>
            <img src={avatarUrl} alt="User Avatar" />
            <div className={getValidClassNames(statusCLasses)} />
        </div>
    );
};

export { HeaderAvatar };
