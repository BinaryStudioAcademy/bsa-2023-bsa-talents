import {
    Avatar,
    Grid,
    Link,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    avatarUrl?: string;
    className?: string;
    companyId: string;
    isOnline: boolean;
    title: string;
};

const ChatHeader: React.FC<Properties> = ({
    companyId,
    avatarUrl,
    className,
    isOnline,
    title,
}) => {
    const onlineIconClasses = getValidClassNames(
        styles.icon,
        isOnline ? styles.online : styles.offline,
    );

    return (
        <Grid className={getValidClassNames(styles.wrapper, className)}>
            <Grid className={styles.logo}>
                <Link to={`/company/${companyId}` as '/company/:id'}>
                    <Avatar isSmall={true} src={avatarUrl} alt={title} />
                </Link>
            </Grid>
            <Grid className={styles.info}>
                <Typography
                    variant="h5"
                    className={getValidClassNames(
                        styles.truncate,
                        styles.title,
                    )}
                >
                    {title}
                </Typography>
                <Grid className={styles.status}>
                    <Grid className={onlineIconClasses} />
                    <p className={styles.textStatus}>
                        {isOnline ? 'Online' : 'Offline'}
                    </p>
                </Grid>
            </Grid>
        </Grid>
    );
};

export { ChatHeader };
