import { type UserSignUpRequestDto } from '~/bundles/auth/types/types';

const USER_SIGN_UP_DEFAULT_VALUES: UserSignUpRequestDto = {
    email: '',
    role: '',
    password: '',
};

export { USER_SIGN_UP_DEFAULT_VALUES };
