import {
    Avatar,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    avatarUrl?: string;
    userId: string;
    children: string;
    userFullName: string;
};

const MessageItem: React.FC<Properties> = ({
    avatarUrl,
    userId,
    children,
    userFullName,
}) => {
    const currentUserId = 'id'; // TODO: get current user from store
    const wrapperClasses = getValidClassNames(styles['message-wrapper']);
    const messageClasses = getValidClassNames(
        styles.message,
        currentUserId === userId && styles['message-own'],
    );
    return (
        <Grid item className={wrapperClasses}>
            <Avatar url={avatarUrl} userFullName={userFullName} />
            <Typography className={messageClasses} variant="body1">
                {children}
            </Typography>
        </Grid>
    );
};

export { MessageItem };
