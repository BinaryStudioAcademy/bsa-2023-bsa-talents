import { Badge as MUIBadge } from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { Avatar, type AvatarProperties } from '../avatar/avatar.js';
import styles from './styles.module.scss';

type Properties = AvatarProperties & {
    isOnline?: boolean;
};

const HeaderAvatar: React.FC<Properties> = ({
    className,
    isOnline,
    ...props
}) => {
    return (
        <div className={className}>
            <MUIBadge
                classes={{
                    badge: getValidClassNames(
                        styles.badge,
                        isOnline ? styles.badgeOnline : styles.badgeOffline,
                    ),
                }}
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
            >
                <Avatar
                    small
                    className={getValidClassNames(styles.headerAvatar)}
                    {...props}
                >
                    {/* default icon/text */}
                </Avatar>
            </MUIBadge>
        </div>
    );
};

export { type Properties as HeaderAvatarProperties };
export { HeaderAvatar };
