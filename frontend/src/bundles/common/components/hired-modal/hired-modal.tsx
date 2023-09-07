import { userSignUpValidationSchema } from '~/bundles/users/users.js';

import { useAppForm, useCallback, useState } from '../../hooks/hooks.js';
import {
    Button,
    FormControl,
    Grid,
    Modal,
    RadioGroup,
    Typography,
} from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    isOpen: boolean;
    onSubmit: (payload: unknown) => void;
    onClose: () => void;
};

const options = [
    {
        value: 'true',
        label: 'Yes',
    },
    {
        value: 'false',
        label: 'No',
    },
];

const HiredModal: React.FC<Properties> = ({ isOpen, onSubmit, onClose }) => {
    const { control, handleSubmit } = useAppForm<{ isHired: boolean }>({
        defaultValues: { isHired: false },
        validationSchema: userSignUpValidationSchema,
    });

    const [isSubmitStep, setIsSubmitStep] = useState(false);

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const handleToSubmitStep = useCallback((): void => {
        setIsSubmitStep(true);
    }, []);

    const handleToInitialStep = useCallback((): void => {
        setIsSubmitStep(false);
    }, []);

    return (
        <Modal
            headerLabel="Hired"
            isOpen={isOpen}
            onClose={onClose}
            className={styles.modal}
        >
            <form onSubmit={handleFormSubmit}>
                <Grid container className={styles.container}>
                    <Typography variant="h6" className={styles.header}>
                        {isSubmitStep
                            ? 'Are you sure you want to confirm this action?'
                            : 'Has the employer already hired you?'}
                    </Typography>

                    {isSubmitStep ? (
                        ''
                    ) : (
                        <FormControl className={styles.radioWrapper}>
                            <RadioGroup
                                className={styles.radioGroup}
                                control={control}
                                options={options}
                                name={'isHired'}
                            />
                        </FormControl>
                    )}
                    <Grid container item className={styles.buttonWrapper}>
                        {isSubmitStep ? (
                            <>
                                <Button
                                    variant="outlined"
                                    component="span"
                                    label="Yes"
                                    type="submit"
                                    className={styles.button}
                                />
                                <Button
                                    variant="outlined"
                                    component="span"
                                    label="Cancel"
                                    onClick={handleToInitialStep}
                                    className={styles.button}
                                />
                            </>
                        ) : (
                            <Button
                                variant="outlined"
                                component="span"
                                label="Submit"
                                onClick={handleToSubmitStep}
                                className={styles.button}
                            />
                        )}
                    </Grid>
                </Grid>
            </form>
        </Modal>
    );
};

export { HiredModal };
