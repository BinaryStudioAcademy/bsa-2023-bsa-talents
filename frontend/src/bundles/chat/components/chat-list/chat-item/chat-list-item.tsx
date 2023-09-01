import { useCallback } from 'react';

import { Avatar, Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

const MAX_LENGTH = {
    start: 0,
    author: 20,
    message: 30,
};

type Properties = {
    userId: string;
    username: string;
    lastMessage?: string;
    lastMessageDate?: string;
    avatar?: string;
    itemSelected?: boolean;
    onClick?: (id: string) => void;
};

const shrinkMessage = (text: string, length: number): string => {
    const newText = text.slice(MAX_LENGTH.start, length);
    return text.length > length ? newText + '...' : newText;
};

const ChatListItem: React.FC<Properties> = ({
    userId,
    username,
    lastMessage = '',
    lastMessageDate = '',
    avatar = '',
    itemSelected = false,
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
                itemSelected ? styles.chatListItemSelected : '',
            )}
            onClick={handleClick}
        >
            <Avatar url={avatar} userFullName={username} size="medium" />
            <Grid flexGrow={1}>
                <div className={getValidClassNames(styles.headerText)}>
                    {shrinkMessage(username, MAX_LENGTH.author)}
                </div>
                <div className={styles.message}>
                    {shrinkMessage(lastMessage, MAX_LENGTH.message)}
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
