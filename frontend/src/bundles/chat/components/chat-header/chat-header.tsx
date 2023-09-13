import { Avatar, Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    avatarUrl?: string;
    isOnline: boolean;
    title: string;
};

const ChatHeader: React.FC<Properties> = ({ avatarUrl, isOnline, title }) => {
    const onlineIconClasses = getValidClassNames(
        styles.icon,
        isOnline ? styles.online : styles.offline,
    );

    return (
        <Grid className={styles.wrapper}>
            <Grid className={styles.logo}>
                <Avatar isSmall={true} src={avatarUrl} alt={title} />
            </Grid>
            <Grid className={styles.info}>
                <p className={styles.title}>{title}</p>
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