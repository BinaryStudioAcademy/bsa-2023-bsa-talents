import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    Textarea,
    Typography,
} from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

const DEFAULT_MODAL = {
    denyReason: '',
};

type Properties = {
    isOpen: boolean;
    handleClose: () => void;
    onSubmit: (denyReason: string) => void;
};

const DenyModal: React.FC<Properties> = ({ isOpen, handleClose, onSubmit }) => {
    const { control, errors, getValues } = useAppForm({
        defaultValues: DEFAULT_MODAL,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            const denyReason = getValues('denyReason');
            onSubmit(denyReason);
            handleClose();
        },
        [onSubmit, getValues, handleClose],
    );

    return (
        <Modal
            headerLabel="Contact candidate"
            isOpen={isOpen}
            onClose={handleClose}
            className={styles.container}
        >
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <Typography className={styles.title} variant="h5">
                    Please specify the reason you deny the verification
                </Typography>
                <FormControl required>
                    <FormLabel className={styles.label}>
                        Write a message
                    </FormLabel>
                    <Textarea
                        name="denyReason"
                        errors={errors}
                        control={control}
                        placeholder="Text"
                        minRows={6}
                        maxRows={6}
                    ></Textarea>
                </FormControl>
                <FormControl className={styles.buttons}>
                    <Button
                        className={styles.button}
                        label="Cancel"
                        variant="outlined"
                        onClick={handleClose}
                    />
                    <Button
                        className={styles.button}
                        label="Ok"
                        onClick={handleFormSubmit}
                    />
                </FormControl>
            </form>
        </Modal>
    );
};

export { DenyModal };
