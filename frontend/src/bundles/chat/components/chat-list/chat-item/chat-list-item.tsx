import { Avatar, Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { GRID_FLEX_GROW } from '../constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    chatId: string;
    username: string;
    lastMessage?: string;
    lastMessageDate?: string;
    avatar?: string;
    isSelected?: boolean;
    onClick?: (id: string) => void;
};

const ChatListItem: React.FC<Properties> = ({
    chatId,
    username,
    lastMessage = '',
    lastMessageDate = '',
    avatar = '',
    isSelected = false,
    onClick,
}) => {
    const handleClick = useCallback((): void => {
        if (onClick) {
            onClick(chatId);
        }
    }, [chatId, onClick]);

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
            <Avatar src={avatar} alt={username} />
            <Grid flexGrow={GRID_FLEX_GROW}>
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

export { ChatListItem };
