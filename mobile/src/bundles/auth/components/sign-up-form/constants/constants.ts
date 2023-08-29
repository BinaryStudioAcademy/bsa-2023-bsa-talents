import { type UserSignUpRequestDto } from '~/bundles/users/users';

const USER_SIGN_UP_DEFAULT_VALUES: UserSignUpRequestDto = {
    email: '',
    password: '',
    role: 'talent', //todo enum (PR bt-86: Sign-up)
};

export { USER_SIGN_UP_DEFAULT_VALUES };
