import { type UserSignUpRequestDto } from '~/bundles/users/users';

const USER_SIGN_UP_DEFAULT_VALUES: UserSignUpRequestDto = {
    email: '',
    password: '',
    isHiring: false,
    isLookingJob: false,
};

export { USER_SIGN_UP_DEFAULT_VALUES };
