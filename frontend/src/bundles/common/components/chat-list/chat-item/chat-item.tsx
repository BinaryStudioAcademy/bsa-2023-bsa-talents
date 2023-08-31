import { useCallback } from 'react';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { Grid, PageAvatar } from '../../components.js';
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

const ChatItem: React.FC<Properties> = ({
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
                styles.chatItem,
                itemSelected ? styles.chatItemSelected : '',
            )}
            onClick={handleClick}
        >
            <PageAvatar src={avatar} />
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

export { type Properties as ChatItemProperties };
export { ChatItem };
