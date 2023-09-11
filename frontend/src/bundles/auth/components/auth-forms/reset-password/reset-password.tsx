import {
    Button,
    FormControl,
    Input,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
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
        <>
            <form className={'form'} onSubmit={handleFormSubmit}>
                <Typography
                    className={getValidClassNames('header', styles.header)}
                    variant="h1"
                >
                    Reset Your Password
                </Typography>
                <FormControl
                    className={getValidClassNames(
                        'inputContainer',
                        errors.email ? '' : 'email',
                    )}
                >
                    <Input
                        className={styles.input}
                        control={control}
                        errors={errors}
                        placeholder="user@email.com"
                        name="email"
                    />
                    <Button className="btn" label="Proceed" />
                </FormControl>
            </form>
        </>
    );
};

export { ResetPassword };
