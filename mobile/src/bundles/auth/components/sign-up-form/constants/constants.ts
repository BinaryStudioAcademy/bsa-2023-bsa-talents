import { UserRole } from '~/bundles/users/enums/enums';
import { type UserSignUpRequestDto } from '~/bundles/users/users';

const USER_SIGN_UP_DEFAULT_VALUES: UserSignUpRequestDto = {
    email: '',
    role: UserRole.TALENT,
    password: '',
};

export { USER_SIGN_UP_DEFAULT_VALUES };
