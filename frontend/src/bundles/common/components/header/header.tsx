import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { HeaderAvatar } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
    className?: string;
};

const Header: React.FC<Properties> = ({ avatarUrl, isOnline, className }) => {
    return (
        <header className={getValidClassNames(styles.header, className)}>
            <HeaderAvatar
                src={avatarUrl}
                isOnline={isOnline}
                className={styles.avatar}
            />
        </header>
    );
};

export { Header };
