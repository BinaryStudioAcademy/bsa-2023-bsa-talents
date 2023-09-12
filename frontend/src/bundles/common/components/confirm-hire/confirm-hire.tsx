import { useAppForm, useCallback, useState } from '../../hooks/hooks.js';
import {
    Button,
    ConfirmModal,
    FormControl,
    Grid,
    RadioGroup,
    Typography,
} from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    label: string;
    modalLabel: string;
    onSubmit: (payload: { isHired: boolean }) => void;
};

const options = [
    {
        value: 'Yes',
        label: 'Yes',
    },
    {
        value: 'No',
        label: 'No',
    },
];

const ConfirmHire: React.FC<Properties> = ({ label, modalLabel, onSubmit }) => {
    const { control } = useAppForm<{ check: string }>({
        defaultValues: { check: 'No' },
    });

    const [isHired, setIsHired] = useState(false);
    const [isSubmitStep, setIsSubmitStep] = useState(false);

    const handleToSubmitStep = useCallback(() => {
        setIsSubmitStep(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsSubmitStep(false);
    }, []);

    const handleConfirm = useCallback(() => {
        onSubmit({ isHired });
        handleModalClose();
    }, [isHired, onSubmit, handleModalClose]);

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            const check = event_.target.check.value;

            const isHired = check === 'Yes' ? true : false;
            setIsHired(isHired);

            handleToSubmitStep();
        },
        [handleToSubmitStep],
    );

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <Grid container className={styles.container}>
                    <Typography variant="h6" align="center">
                        {label}
                    </Typography>

                    <FormControl className={styles.radioWrapper}>
                        <RadioGroup
                            className={styles.radioGroup}
                            control={control}
                            options={options}
                            name="check"
                        />
                    </FormControl>

                    <Grid container item className={styles.buttonWrapper}>
                        <Button
                            variant="outlined"
                            component="span"
                            label="Submit"
                            type="submit"
                            className={styles.button}
                        />
                    </Grid>
                </Grid>
            </form>

            <ConfirmModal
                label={modalLabel}
                isOpen={isSubmitStep}
                onConfirm={handleConfirm}
                onDecline={handleModalClose}
                onClose={handleModalClose}
            />
        </>
    );
};

export { ConfirmHire };
