import { CloseRounded } from '@mui/icons-material';
import { Divider, Modal as MUIModal } from '@mui/material';
import { useCallback, useState } from 'react';

import { Button, Typography } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    children: React.ReactNode;
    headerLabel: string;
    openButtonLabel: string;
    className?: string;
};

const Modal: React.FC<Properties> = ({
    className,
    children,
    headerLabel,
    openButtonLabel,
}) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = useCallback((): void => {
        setOpen(true);
    }, []);

    const handleClose = useCallback((): void => {
        setOpen(false);
    }, []);

    return (
        <div>
            <Button onClick={handleOpen} label={openButtonLabel} />
            <MUIModal
                open={open}
                onClose={handleClose}
                className={styles.modalWrapper}
            >
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <Typography variant="h6">{headerLabel}</Typography>
                        <div className={styles.closeButtonWrapper}>
                            <Divider
                                className={styles.dividerVertical}
                                orientation="vertical"
                            />
                            <Button
                                onClick={handleClose}
                                className={styles.iconButton}
                                label=""
                                variant="outlined"
                                endIcon={
                                    <CloseRounded
                                        className={styles.closeIcon}
                                    />
                                }
                            />
                        </div>
                    </div>
                    <Divider />
                    <div className={className}>{children}</div>
                </div>
            </MUIModal>
        </div>
    );
};

export { Modal };
