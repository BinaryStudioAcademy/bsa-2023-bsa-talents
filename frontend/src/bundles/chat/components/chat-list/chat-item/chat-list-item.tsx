import { useCallback } from 'react';

import { Avatar, Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    userId: string;
    username: string;
    lastMessage?: string;
    lastMessageDate?: string;
    avatar?: string;
    isSelected?: boolean;
    onClick?: (id: string) => void;
};

const ChatListItem: React.FC<Properties> = ({
    userId,
    username,
    lastMessage = '',
    lastMessageDate = '',
    avatar = '',
    isSelected = false,
    onClick,
}) => {
    const handleClick = useCallback((): void => {
        if (onClick) {
            onClick(userId);
        }
    }, [userId, onClick]);

    return (
        <Grid
            container
            alignContent="center"
            gap="16px"
            wrap="nowrap"
            component="article"
            className={getValidClassNames(
                styles.chatListItem,
                isSelected ? styles.chatListItemSelected : '',
            )}
            onClick={handleClick}
        >
            <Avatar url={avatar} userFullName={username} size="medium" />
            <Grid flexGrow={1}>
                <div
                    className={getValidClassNames(
                        styles.headerText,
                        styles.truncate,
                    )}
                >
                    {username}
                </div>
                <div
                    className={getValidClassNames(
                        styles.message,
                        styles.truncate,
                    )}
                >
                    {lastMessage}
                </div>
            </Grid>
            <div className={getValidClassNames(styles.headerText, styles.date)}>
                {lastMessageDate}
            </div>
        </Grid>
    );
};

export { type Properties as ChatListItemProperties };
export { ChatListItem };
