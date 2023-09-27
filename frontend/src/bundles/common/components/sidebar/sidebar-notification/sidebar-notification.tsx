import { Close } from '@mui/icons-material';

import { Typography } from '../../components.js';
import styles from './styles.module.scss';

type Properties = {
    isVisible: boolean;
    handleClose: () => void;
};

const SidebarNotification: React.FC<Properties> = ({
    isVisible,
    handleClose,
}) => {
    return (
        <div className={`${styles.notification} ${isVisible && styles.shown}`}>
            <Typography variant="body1" className={styles.message}>
                You can&apos;t visit this page until your account is approved
            </Typography>
            <Close className={styles.icon} onClick={handleClose} />
        </div>
    );
};

export { SidebarNotification };
