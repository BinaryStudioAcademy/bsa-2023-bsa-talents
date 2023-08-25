import { CloseRounded } from '@mui/icons-material';
import { Divider, Modal as MUIModal } from '@mui/material';

import { Button, Typography } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    children: React.ReactNode;
    headerLabel: string;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
};

const Modal: React.FC<Properties> = ({
    className,
    children,
    headerLabel,
    isOpen,
    onClose,
}) => (
    <MUIModal open={isOpen} onClose={onClose} className={styles.modalWrapper}>
        <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
                <Typography variant="h6">{headerLabel}</Typography>
                <div className={styles.closeButtonWrapper}>
                    <Divider
                        className={styles.dividerVertical}
                        orientation="vertical"
                    />
                    <Button
                        onClick={onClose}
                        className={styles.iconButton}
                        label=""
                        variant="outlined"
                        endIcon={<CloseRounded className={styles.closeIcon} />}
                    />
                </div>
            </div>
            <Divider />
            <div className={className}>{children}</div>
        </div>
    </MUIModal>
);

export { Modal };
