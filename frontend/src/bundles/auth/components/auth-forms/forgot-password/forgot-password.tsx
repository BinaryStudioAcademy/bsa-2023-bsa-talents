import {
    Button,
    FormControl,
    Input,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    type UserForgotPasswordRequestDto,
    userForgotPasswordValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_FORGOT_PASSWORD_PAYLOAD } from './constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserForgotPasswordRequestDto) => void;
};

const ForgotPassword: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } =
        useAppForm<UserForgotPasswordRequestDto>({
            defaultValues: DEFAULT_FORGOT_PASSWORD_PAYLOAD,
            validationSchema: userForgotPasswordValidationSchema,
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
                    <Button className="btn" label="Proceed" type="submit" />
                </FormControl>
            </form>
        </>
    );
};

export { ForgotPassword };
