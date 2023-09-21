import { HeaderAvatar } from '~/bundles/common/components/avatar/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { Dropdown, MenuButton, VerificationLabel } from '../components.js';
import { HeaderUserMenu } from './components.js';
import styles from './styles.module.scss';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
    isWaitingForApproval?: boolean;
    className?: string;
};

const Header: React.FC<Properties> = ({
    avatarUrl,
    isWaitingForApproval,
    isOnline,
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
                        className={styles.avatar}
                    />
                </MenuButton>
                <HeaderUserMenu />
            </Dropdown>
        </header>
    );
};

export { Header };
