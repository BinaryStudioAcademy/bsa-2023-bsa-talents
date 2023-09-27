import {
    Button,
    FormControl,
    Input,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    userPasswordValidationSchema,
    type UserResetPasswordDto,
} from '~/bundles/users/users.js';

import { DEFAULT_RESET_PASSWORD_PAYLOAD } from './constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserResetPasswordDto) => void;
};

const ResetPassword: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserResetPasswordDto>({
        defaultValues: DEFAULT_RESET_PASSWORD_PAYLOAD,
        validationSchema: userPasswordValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <>
            <form className={'form'} onSubmit={handleFormSubmit}>
                <Typography
                    className={getValidClassNames('header', styles.header)}
                    variant="h1"
                >
                    Enter your new password
                </Typography>
                <FormControl
                    className={getValidClassNames(
                        'inputContainer',
                        errors.password ? '' : 'password',
                    )}
                >
                    <Input
                        className={styles.input}
                        control={control}
                        errors={errors}
                        placeholder="****"
                        name="password"
                        type="password"
                    />
                    <Button className="btn" label="Proceed" type="submit" />
                </FormControl>
            </form>
        </>
    );
};

export { ResetPassword };
