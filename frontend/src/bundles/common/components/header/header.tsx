import { HeaderAvatar } from '~/bundles/common/components/avatar/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { Dropdown, MenuButton, VerificationLabel } from '../components.js';
import { HeaderUserMenu } from './components.js';
import styles from './styles.module.scss';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
    isAdmin?: boolean;
    isWaitingForApproval?: boolean;
    className?: string;
};

const Header: React.FC<Properties> = ({
    avatarUrl,
    isWaitingForApproval,
    isOnline,
    isAdmin,
    className,
}) => {
    return (
        <header className={getValidClassNames(styles.header, className)}>
            {isWaitingForApproval && <VerificationLabel />}
            <Dropdown>
                <MenuButton>
                    <HeaderAvatar
                        src={avatarUrl}
                        isOnline={isOnline}
                        isAdmin={isAdmin}
                        className={styles.avatar}
                    />
                </MenuButton>
                <HeaderUserMenu />
            </Dropdown>
        </header>
    );
};

export { Header };
