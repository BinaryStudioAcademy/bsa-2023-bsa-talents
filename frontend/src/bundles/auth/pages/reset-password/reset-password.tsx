import { Grid } from '@mui/material';

import {
    Button,
    FormControl,
    Input,
    Logo,
    Typography,
} from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

const ResetPassword: React.FC = () => {
    const { control, errors } = useAppForm<{ email: string }>({
        defaultValues: {
            email: '',
        },
    });

    const handleFormSubmit = useCallback((): void => {
        // TODO: Handle password reset
    }, []);

    return (
        <Grid container className={styles.container}>
            <Grid item xs={12} className={styles.header}>
                <Logo className={styles.logo} />
            </Grid>
            <Grid item xs={12} className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleFormSubmit}>
                    <FormControl>
                        <Typography className={styles.h1} variant="h1">
                            Reset Your Password
                        </Typography>
                        <Input
                            className={styles.input}
                            control={control}
                            errors={errors}
                            placeholder="user@email.com"
                            name="email"
                        />
                        <Button className={styles.button} label="Proceed" />
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};

export { ResetPassword };
