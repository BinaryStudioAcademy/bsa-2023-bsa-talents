import { Grid } from '~/bundles/common/components/components.js';
import { UserRole } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

import {
    EMPLOYER_CHAT_PLACEHOLDER,
    TALENT_CHAT_PLACEHOLDER,
} from '../../constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    className?: string;
};

const ChatPlaceholder: React.FC<Properties> = ({ className }) => {
    const { user } = useAppSelector(({ auth }) => ({
        user: auth.currentUser,
    }));

    return (
        <Grid className={className}>
            <p className={styles.noChatsPlaceholder}>
                {user?.role === UserRole.EMPLOYER
                    ? EMPLOYER_CHAT_PLACEHOLDER
                    : TALENT_CHAT_PLACEHOLDER}
            </p>
        </Grid>
    );
};

export { ChatPlaceholder };
