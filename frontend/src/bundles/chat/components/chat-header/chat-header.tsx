import { UserRole } from 'shared/build/index.js';

import {
    Avatar,
    Grid,
    Link,
    Typography,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type ApplicationRoute } from '~/bundles/common/types/application-route.type.js';

import { getChatHeaderProps as getChatHeaderProperties } from '../../helpers/get-chat-header-props.js';
import styles from './styles.module.scss';

type Properties = {
    className?: string;
    isOnline: boolean;
    userId: string;
};

const ChatHeader: React.FC<Properties> = ({ className, isOnline, userId }) => {
    const { role, isLoading, currentChatId, chats, user } = useAppSelector(
        ({ auth, chat }) => ({
            user: auth.currentUser,
            chats: chat.chats,
            role: auth.currentUser?.role,
            isLoading: chat.dataStatus === 'pending',
            currentChatId: chat.current.chatId,
        }),
    );
    const onlineIconClasses = getValidClassNames(
        styles.icon,
        isOnline ? styles.online : styles.offline,
    );

    const { chatHeaderName: title, chatHeaderAvatar: avatarUrl } =
        getChatHeaderProperties({
            chats,
            selectedId: currentChatId,
            userId: user?.id,
            userRole: user?.role,
        });

    const infoLink: ApplicationRoute = AppRoute.CANDIDATE.replace(
        ':userId',
        userId,
    ) as ApplicationRoute;

    const talentHeaderTitle: JSX.Element = (
        <Link to={isLoading ? '#' : infoLink} className={styles.candidateLink}>
            {title}
        </Link>
    );

    const employerHeaderTitle: JSX.Element = <>{title}</>;

    return currentChatId ? (
        <Grid className={getValidClassNames(styles.wrapper, className)}>
            <Grid className={styles.logo}>
                <Avatar isSmall={true} src={avatarUrl} alt={title} />
            </Grid>
            <Grid className={styles.info}>
                <Typography
                    variant="h5"
                    className={getValidClassNames(
                        styles.truncate,
                        styles.title,
                    )}
                >
                    {role === UserRole.TALENT
                        ? employerHeaderTitle
                        : talentHeaderTitle}
                </Typography>
                <Grid className={styles.status}>
                    <Grid className={onlineIconClasses} />
                    <p className={styles.textStatus}>
                        {isOnline ? 'Online' : 'Offline'}
                    </p>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Grid className={getValidClassNames(styles.wrapper, className)}></Grid>
    );
};

export { ChatHeader };
