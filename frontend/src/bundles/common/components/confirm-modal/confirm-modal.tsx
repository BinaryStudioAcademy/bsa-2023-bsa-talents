import { Button, Grid, Modal, Typography } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    label: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onDecline: () => void;
};

const ConfirmModal: React.FC<Properties> = ({
    label,
    isOpen,
    onClose,
    onConfirm,
    onDecline,
}) => {
    return (
        <Modal
            headerLabel={label}
            isOpen={isOpen}
            onClose={onClose}
            className={styles.modal}
        >
            <Grid container className={styles.modalContainer}>
                <Typography variant="h6" align="center">
                    Are you sure you want to confirm this action?
                </Typography>
                <Grid container item className={styles.buttonWrapper}>
                    <Button
                        variant="outlined"
                        component="span"
                        label="Yes"
                        onClick={onConfirm}
                        className={styles.button}
                    />
                    <Button
                        variant="outlined"
                        component="span"
                        label="Cancel"
                        onClick={onDecline}
                        className={styles.button}
                    />
                </Grid>
            </Grid>
        </Modal>
    );
};

export { ConfirmModal };
